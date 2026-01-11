import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const customerRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const customers = await ctx.db.customer.findMany({
            where: {
                organizationId: user.organizationId,
            },
            include: {
                subscriptions: {
                    where: {
                        status: { in: ["active", "past_due"] },
                    },
                },
                mrrMovements: {
                    orderBy: { effectiveDate: "desc" },
                    take: 1, // Get latest movement to help with status if needed
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return customers.map((customer) => {
            // Calculate Current MRR
            let currentMrr = 0;
            for (const sub of customer.subscriptions) {
                let subMrr = 0;
                if (sub.billingInterval === "month") {
                    subMrr = Math.round(sub.amount / (sub.billingIntervalCount || 1));
                } else if (sub.billingInterval === "year") {
                    subMrr = Math.round(sub.amount / 12 / (sub.billingIntervalCount || 1));
                }
                currentMrr += subMrr;
            }

            // Determine Status
            let status: "active" | "churned" | "lead" | "at-risk" = "lead";

            const hasPastDue = customer.subscriptions.some(s => s.status === "past_due");

            if (currentMrr > 0) {
                status = hasPastDue ? "at-risk" : "active";
            } else if (customer.mrrMovements.length > 0) {
                status = "churned";
            }

            return {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                stripeCustomerId: customer.stripeCustomerId,
                currentMrr,
                status,
                createdAt: customer.createdAt,
            };
        });
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const user = await ctx.db.user.findUnique({
                where: { id: userId },
                select: { organizationId: true },
            });

            if (!user?.organizationId) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            const customer = await ctx.db.customer.findFirst({
                where: {
                    id: input.id,
                    organizationId: user.organizationId,
                },
                include: {
                    subscriptions: {
                        orderBy: { createdAt: "desc" },
                    },
                    mrrMovements: {
                        orderBy: { effectiveDate: "desc" },
                    },
                },
            });

            if (!customer) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            // Calculate Current MRR
            let currentMrr = 0;
            const activeSubs = customer.subscriptions.filter((s) => ["active", "past_due"].includes(s.status || ""));

            for (const sub of activeSubs) {
                let subMrr = 0;
                if (sub.billingInterval === "month") {
                    subMrr = Math.round(sub.amount / (sub.billingIntervalCount || 1));
                } else if (sub.billingInterval === "year") {
                    subMrr = Math.round(sub.amount / 12 / (sub.billingIntervalCount || 1));
                }
                currentMrr += subMrr;
            }

            // Determine Status
            let status: "active" | "churned" | "lead" | "at-risk" = "lead";

            const hasPastDue = customer.subscriptions.some(s => s.status === "past_due");

            if (currentMrr > 0) {
                status = hasPastDue ? "at-risk" : "active";
            } else if (customer.mrrMovements.length > 0) {
                status = "churned";
            }

            return {
                ...customer,
                currentMrr,
                status,
            };
        }),
});
