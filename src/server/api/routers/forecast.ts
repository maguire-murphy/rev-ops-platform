import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const forecastRouter = createTRPCRouter({
    getMrrForecast: protectedProcedure
        .input(z.object({
            months: z.number().min(1).max(24).default(6),
        }))
        .query(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const user = await ctx.db.user.findUnique({
                where: { id: userId },
                select: { organizationId: true },
            });

            if (!user?.organizationId) {
                return {
                    conservative: [],
                    moderate: [],
                    aggressive: [],
                };
            }

            const organizationId = user.organizationId;

            // Fetch last 6 months of MRR history to calculate trends
            const history = await ctx.db.mrrSnapshot.findMany({
                where: { organizationId },
                orderBy: { snapshotDate: "desc" },
                take: 6,
            });

            let currentMrr = 0;
            let avgGrowthRate = 0.05; // Default 5% growth if no history

            if (history.length > 0) {
                currentMrr = history[0].totalMrr;
            } else {
                const activeSubscriptions = await ctx.db.subscription.findMany({
                    where: {
                        organizationId,
                        status: { in: ["active", "past_due"] },
                    },
                });

                for (const sub of activeSubscriptions) {
                    let subMrr = 0;
                    if (sub.billingInterval === "month") {
                        subMrr = Math.round(sub.amount / (sub.billingIntervalCount || 1));
                    } else if (sub.billingInterval === "year") {
                        subMrr = Math.round(sub.amount / 12 / (sub.billingIntervalCount || 1));
                    }
                    currentMrr += subMrr;
                }
            }

            if (history.length >= 2) {
                const sortedHistory = [...history].sort((a, b) => a.snapshotDate.getTime() - b.snapshotDate.getTime());
                const oldestMrr = sortedHistory[0].totalMrr;
                const newestMrr = sortedHistory[sortedHistory.length - 1].totalMrr;

                if (oldestMrr > 0) {
                    const monthsDiff = sortedHistory.length - 1;
                    avgGrowthRate = Math.pow(newestMrr / oldestMrr, 1 / monthsDiff) - 1;
                }
            }

            const generateForecast = (growthRate: number) => {
                const forecast = [];
                let projectedMrr = currentMrr;
                const startDate = new Date();

                forecast.push({
                    date: startDate.toISOString().split("T")[0],
                    mrr: Math.round(projectedMrr),
                    type: "historical" as const
                });

                for (let i = 1; i <= input.months; i++) {
                    projectedMrr = projectedMrr * (1 + growthRate);
                    const date = new Date(startDate);
                    date.setMonth(date.getMonth() + i);

                    forecast.push({
                        date: date.toISOString().split("T")[0],
                        mrr: Math.round(projectedMrr),
                        type: "projected" as const
                    });
                }
                return forecast;
            };

            return {
                conservative: generateForecast(Math.max(0, avgGrowthRate * 0.5)),
                moderate: generateForecast(avgGrowthRate),
                aggressive: generateForecast(avgGrowthRate * 1.5),
            };
        }),

    getPipelineForecast: protectedProcedure
        .query(async ({ ctx }) => {
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
                    isClosed: false,
                    closeDate: {
                        gte: new Date(), // Future deals only
                    },
                },
                select: {
                    amount: true,
                    probability: true,
                    closeDate: true,
                },
            });

            // Group by month
            const monthlyData = new Map<string, { weighted: number; total: number }>();

            for (const deal of deals) {
                if (!deal.closeDate || !deal.amount) continue;

                const monthKey = deal.closeDate.toISOString().slice(0, 7); // YYYY-MM
                const probability = deal.probability || 10; // Default 10% if missing
                const weighted = deal.amount * (probability / 100);

                const current = monthlyData.get(monthKey) || { weighted: 0, total: 0 };
                monthlyData.set(monthKey, {
                    weighted: current.weighted + weighted,
                    total: current.total + deal.amount,
                });
            }

            // Convert to array and sort
            const result = Array.from(monthlyData.entries())
                .map(([date, values]) => ({
                    date,
                    weightedValue: Math.round(values.weighted),
                    totalValue: values.total,
                }))
                .sort((a, b) => a.date.localeCompare(b.date));

            return result;
        }),

    getForecastAccuracy: protectedProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.session.user.id;
            const user = await ctx.db.user.findUnique({
                where: { id: userId },
                select: { organizationId: true },
            });

            if (!user?.organizationId) {
                return [];
            }

            const organizationId = user.organizationId;
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

            // 1. Get Historical Forecasts (Snapshots)
            // We want the snapshot from the BEGINNING of each month to see what was forecast for that month
            // Or maybe the end of the previous month?
            // Let's take the first snapshot of each month.
            const snapshots = await ctx.db.pipelineSnapshot.findMany({
                where: {
                    organizationId,
                    snapshotDate: {
                        gte: sixMonthsAgo,
                    },
                },
                orderBy: { snapshotDate: "asc" },
            });

            // 2. Get Actual Won Revenue
            const wonDeals = await ctx.db.deal.findMany({
                where: {
                    organizationId,
                    isClosed: true,
                    isWon: true,
                    closeDate: {
                        gte: sixMonthsAgo,
                    },
                },
                select: {
                    amount: true,
                    closeDate: true,
                },
            });

            // Group Actuals by Month
            const actualsByMonth = new Map<string, number>();
            for (const deal of wonDeals) {
                if (!deal.closeDate || !deal.amount) continue;
                const monthKey = deal.closeDate.toISOString().slice(0, 7); // YYYY-MM
                actualsByMonth.set(monthKey, (actualsByMonth.get(monthKey) || 0) + deal.amount);
            }

            // Group Snapshots by Month (taking the latest snapshot for a month as the "final" forecast? 
            // Or the average? Let's take the latest one available for that month to represent the state.)
            // Actually, usually you compare what you forecast at the START of the month vs what you won by the END.
            // But for simplicity, let's just map snapshots to their months.
            const forecastsByMonth = new Map<string, number>();
            for (const snap of snapshots) {
                const monthKey = snap.snapshotDate.toISOString().slice(0, 7);
                // Overwrite with latest snapshot for that month
                forecastsByMonth.set(monthKey, snap.weightedValue);
            }

            // Combine
            const months = new Set([...actualsByMonth.keys(), ...forecastsByMonth.keys()]);
            const result = Array.from(months).map(month => ({
                date: month,
                forecast: Math.round(forecastsByMonth.get(month) || 0),
                actual: actualsByMonth.get(month) || 0,
                accuracy: (actualsByMonth.get(month) || 0) > 0
                    ? Math.round(((forecastsByMonth.get(month) || 0) / (actualsByMonth.get(month) || 0)) * 100)
                    : 0
            })).sort((a, b) => a.date.localeCompare(b.date));

            return result;
        }),
});
