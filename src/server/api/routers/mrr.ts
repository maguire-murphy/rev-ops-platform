import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";


export const mrrRouter = createTRPCRouter({
    getDashboardMetrics: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return {
                totalMrr: 0,
                arr: 0,
                activeCustomers: 0,
                mrrGrowth: 0,
            };
        }

        const organizationId = user.organizationId;

        // 1. Calculate Current MRR & Active Customers
        const activeSubscriptions = await ctx.db.subscription.findMany({
            where: {
                organizationId,
                status: { in: ["active", "past_due"] },
            },
        });

        let totalMrr = 0;
        const activeCustomerIds = new Set<string>();

        for (const sub of activeSubscriptions) {
            // Calculate MRR for this sub
            let subMrr = 0;
            if (sub.billingInterval === "month") {
                subMrr = Math.round(sub.amount / (sub.billingIntervalCount || 1));
            } else if (sub.billingInterval === "year") {
                subMrr = Math.round(sub.amount / 12 / (sub.billingIntervalCount || 1));
            }
            totalMrr += subMrr;

            if (sub.customerId) {
                activeCustomerIds.add(sub.customerId);
            }
        }

        const arr = totalMrr * 12;
        const activeCustomers = activeCustomerIds.size;

        // 2. Calculate Growth (vs 30 days ago)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const pastSnapshot = await ctx.db.mrrSnapshot.findFirst({
            where: {
                organizationId,
                snapshotDate: {
                    lte: thirtyDaysAgo,
                },
            },
            orderBy: {
                snapshotDate: "desc",
            },
        });

        let mrrGrowth = 0;
        if (pastSnapshot && pastSnapshot.totalMrr > 0) {
            mrrGrowth = ((totalMrr - pastSnapshot.totalMrr) / pastSnapshot.totalMrr) * 100;
        } else if (totalMrr > 0) {
            mrrGrowth = 100; // 100% growth if started from 0
        }

        return {
            totalMrr,
            arr,
            activeCustomers,
            mrrGrowth,
        };
    }),

    getMrrHistory: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const history = await ctx.db.mrrSnapshot.findMany({
            where: {
                organizationId: user.organizationId,
            },
            orderBy: {
                snapshotDate: "asc",
            },
            take: 30, // Last 30 snapshots
        });

        return history.map(snap => ({
            date: snap.snapshotDate.toISOString().split("T")[0],
            mrr: snap.totalMrr / 100, // Convert to dollars for chart
        }));
    }),

    getMovements: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const movements = await ctx.db.mrrMovement.findMany({
            where: {
                organizationId: user.organizationId,
            },
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

    getRevenueCohorts: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const { CohortService } = await import("@/server/services/cohort-service");
        return CohortService.getRevenueCohorts(user.organizationId);
    }),

    getCustomerCohorts: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const { CohortService } = await import("@/server/services/cohort-service");
        return CohortService.getCustomerCohorts(user.organizationId);
    }),

    getMrrByPlan: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return [];
        }

        const activeSubscriptions = await ctx.db.subscription.findMany({
            where: {
                organizationId: user.organizationId,
                status: { in: ["active", "past_due"] },
            },
        });

        const mrrByPlan: Record<string, number> = {};

        for (const sub of activeSubscriptions) {
            const planName = sub.planName || "Unknown";
            let subMrr = 0;
            if (sub.billingInterval === "month") {
                subMrr = Math.round(sub.amount / (sub.billingIntervalCount || 1));
            } else if (sub.billingInterval === "year") {
                subMrr = Math.round(sub.amount / 12 / (sub.billingIntervalCount || 1));
            }

            mrrByPlan[planName] = (mrrByPlan[planName] || 0) + subMrr;
        }

        return Object.entries(mrrByPlan)
            .map(([name, value]) => ({ name, value: value / 100 })) // Convert to dollars
            .sort((a, b) => b.value - a.value);
    }),

    getChurnMetrics: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const user = await ctx.db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return {
                currentChurnRate: 0,
                churnTrend: [],
            };
        }

        // Fetch last 30 snapshots
        const snapshots = await ctx.db.mrrSnapshot.findMany({
            where: {
                organizationId: user.organizationId,
            },
            orderBy: {
                snapshotDate: "desc",
            },
            take: 30,
        });

        // Calculate daily churn rate for each snapshot
        // Churn Rate = Churn MRR / (Total MRR + Churn MRR)  <-- Approximation of Start MRR
        // Or just Churn MRR / Total MRR (if Total is End MRR)
        // Let's use: Churn Rate = Churn MRR / (Total MRR + Churn MRR) * 100

        const churnTrend = snapshots.map(snap => {
            const startMrr = snap.totalMrr + (snap.churnMrr || 0);
            const churnRate = startMrr > 0 ? ((snap.churnMrr || 0) / startMrr) * 100 : 0;
            return {
                date: snap.snapshotDate.toISOString().split("T")[0],
                value: churnRate,
            };
        }).reverse();

        const currentChurnRate = churnTrend.length > 0 ? churnTrend[churnTrend.length - 1].value : 0;

        return {
            currentChurnRate,
            churnTrend,
        };
    }),
});
