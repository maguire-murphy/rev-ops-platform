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
            const now = new Date();

            // Get all deals expected to close in the last 6 months.
            // Includes won, lost, and slipped (still open past their close date).
            // This gives a per-month view: forecast = total pipeline that was expected
            // to close in that month, actual = what was actually won.
            const deals = await ctx.db.deal.findMany({
                where: {
                    organizationId,
                    closeDate: {
                        gte: sixMonthsAgo,
                        lt: now,
                    },
                },
                select: {
                    amount: true,
                    closeDate: true,
                    isClosed: true,
                    isWon: true,
                },
            });

            const forecastByMonth = new Map<string, number>();
            const actualByMonth = new Map<string, number>();

            for (const deal of deals) {
                if (!deal.closeDate || !deal.amount) continue;
                const monthKey = deal.closeDate.toISOString().slice(0, 7);

                // Every deal with a close date in this month was part of the forecast
                forecastByMonth.set(monthKey, (forecastByMonth.get(monthKey) || 0) + deal.amount);

                // Only closed-won deals count as actual revenue
                if (deal.isClosed && deal.isWon) {
                    actualByMonth.set(monthKey, (actualByMonth.get(monthKey) || 0) + deal.amount);
                }
            }

            const months = new Set([...forecastByMonth.keys(), ...actualByMonth.keys()]);
            const result = Array.from(months).map(month => {
                const forecast = forecastByMonth.get(month) || 0;
                const actual = actualByMonth.get(month) || 0;
                return {
                    date: month,
                    forecast: Math.round(forecast),
                    actual,
                    accuracy: forecast > 0
                        ? Math.round((actual / forecast) * 100)
                        : 0,
                };
            }).sort((a, b) => a.date.localeCompare(b.date));

            return result;
        }),
});
