import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const organizationRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            name: z.string().min(1, "Organization name is required"),
            slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
        }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;

            // Check if slug exists
            const existingOrg = await ctx.db.organization.findUnique({
                where: { slug: input.slug },
            });

            if (existingOrg) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Organization with this slug already exists",
                });
            }

            // Ensure user exists in DB (for Dev Login)
            // We use upsert to be safe, though findUnique + create would also work
            await ctx.db.user.upsert({
                where: { id: userId },
                update: {},
                create: {
                    id: userId,
                    email: ctx.session.user.email || `user-${userId}@example.com`,
                    name: ctx.session.user.name || "User",
                    image: ctx.session.user.image,
                },
            });

            // Create Org
            const org = await ctx.db.organization.create({
                data: {
                    name: input.name,
                    slug: input.slug,
                    users: {
                        connect: { id: userId },
                    },
                },
            });

            // Update User with OrgId and Role
            await ctx.db.user.update({
                where: { id: userId },
                data: {
                    organizationId: org.id,
                    role: "owner",
                },
            });

            return org;
        }),

    getSettings: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return null;
        }

        return ctx.db.organization.findUnique({
            where: { id: user.organizationId },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        image: true,
                    },
                },
            },
        });
    }),

    inviteMember: protectedProcedure
        .input(z.object({
            email: z.string().email(),
            role: z.enum(["admin", "member"]).default("member"),
        }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const user = await ctx.db.user.findUnique({
                where: { id: userId },
                select: { organizationId: true },
            });

            if (!user?.organizationId) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "No organization found" });
            }

            // Check if user already exists
            const existingUser = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (existingUser) {
                if (existingUser.organizationId === user.organizationId) {
                    throw new TRPCError({ code: "CONFLICT", message: "User is already in this organization" });
                }
                // If user exists but in another org (or no org), we might want to handle differently.
                // For MVP, let's assume one user = one org.
                // If they have no org, we can add them.
                if (!existingUser.organizationId) {
                    return ctx.db.user.update({
                        where: { id: existingUser.id },
                        data: {
                            organizationId: user.organizationId,
                            role: input.role,
                        },
                    });
                }
                throw new TRPCError({ code: "CONFLICT", message: "User belongs to another organization" });
            }

            // Create new user (invite)
            return ctx.db.user.create({
                data: {
                    email: input.email,
                    organizationId: user.organizationId,
                    role: input.role,
                    // No name or image yet, they will set it on login
                },
            });
        }),
});
