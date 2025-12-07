import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const mrrRouter = createTRPCRouter({
    getMovements: publicProcedure.query(async ({ ctx }) => {
        const movements = await ctx.db.mrrMovement.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: true,
            },
            take: 50, // Limit for MVP
        });

        return movements;
    }),
});
