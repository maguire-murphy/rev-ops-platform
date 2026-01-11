import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const dealsRouter = createTRPCRouter({
    getPipeline: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const deals = await ctx.db.deal.findMany({
            where: {
                organizationId: user.organizationId,
                isClosed: false, // Only fetch open deals for the pipeline board by default? Or all?
                // Let's fetch all for now and filter on frontend if needed, or maybe just open ones for "Pipeline".
                // Usually a pipeline view shows open deals.
            },
            orderBy: {
                createdDate: "desc",
            },
            include: {
                customer: true,
                activities: {
                    where: {
                        activityDate: {
                            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
                        },
                    },
                },
            },
        });

        // Calculate Score & Health
        const enhancedDeals = deals.map(deal => {
            let score = 50; // Base score

            // Activity Score (+10 per activity in last 30d)
            score += (deal.activities.length * 10);

            // Inactivity Penalty (-10 per 7d inactive)
            const lastActivityDate = deal.activities.length > 0
                ? deal.activities.sort((a, b) => (b.activityDate?.getTime() || 0) - (a.activityDate?.getTime() || 0))[0].activityDate
                : deal.updatedAt;

            const daysInactive = Math.floor((Date.now() - (lastActivityDate?.getTime() || 0)) / (1000 * 60 * 60 * 24));
            const weeksInactive = Math.floor(daysInactive / 7);
            score -= (weeksInactive * 10);

            // Stage Bonus (+20 if advanced)
            const lowerStage = deal.stage?.toLowerCase() || "";
            if (lowerStage.includes("contract") || lowerStage.includes("decision") || lowerStage.includes("negotiation")) {
                score += 20;
            }

            // Cap score
            score = Math.max(0, Math.min(100, score));

            // Determine Health
            let health: "Healthy" | "Neutral" | "At Risk" = "Neutral";
            if (score > 70) health = "Healthy";
            if (score < 30) health = "At Risk";

            // Determine Stalled (no update in 14 days)
            const isStalled = daysInactive > 14;

            return {
                ...deal,
                score,
                health,
                isStalled,
            };
        });

        return enhancedDeals;
    }),

    getMetrics: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return {
                totalPipelineValue: 0,
                openDealsCount: 0,
                winRate: 0,
                avgDealSize: 0,
            };
        }

        const organizationId = user.organizationId;

        // 1. Open Deals Metrics
        const openDeals = await ctx.db.deal.findMany({
            where: {
                organizationId,
                isClosed: false,
            },
            select: {
                amount: true,
            },
        });

        const totalPipelineValue = openDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0);
        const openDealsCount = openDeals.length;
        const avgDealSize = openDealsCount > 0 ? Math.round(totalPipelineValue / openDealsCount) : 0;

        // 2. Win Rate (All time or last 30 days?)
        // Let's do all time for now for simplicity
        const closedDeals = await ctx.db.deal.findMany({
            where: {
                organizationId,
                isClosed: true,
            },
            select: {
                isWon: true,
            },
        });

        const totalClosed = closedDeals.length;
        const totalWon = closedDeals.filter(d => d.isWon).length;
        const winRate = totalClosed > 0 ? (totalWon / totalClosed) * 100 : 0;

        return {
            totalPipelineValue,
            openDealsCount,
            winRate,
            avgDealSize,
        };
    }),
});
