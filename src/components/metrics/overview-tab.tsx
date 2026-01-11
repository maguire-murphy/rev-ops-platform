"use client";

import { api } from "@/trpc/react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MrrByPlanChart } from "@/components/dashboard/mrr-by-plan-chart";
import { ChurnRateChart } from "@/components/dashboard/churn-rate-chart";
import { MrrMovementsTable } from "@/components/dashboard/mrr-movements-table";
import { DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Loader2 } from "lucide-react";

export function OverviewTab() {
    const { data: metrics, isLoading: isLoadingMetrics } = api.mrr.getDashboardMetrics.useQuery();
    const { data: mrrByPlan, isLoading: isLoadingPlan } = api.mrr.getMrrByPlan.useQuery();
    const { data: churnMetrics, isLoading: isLoadingChurn } = api.mrr.getChurnMetrics.useQuery();

    if (isLoadingMetrics) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    const totalMrr = metrics?.totalMrr ? metrics.totalMrr / 100 : 0;
    const arr = metrics?.arr ? metrics.arr / 100 : 0;

    return (
        <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total MRR"
                    value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalMrr)}
                    icon={DollarSign}
                    trend={metrics?.mrrGrowth}
                    description="from last month"
                />
                <MetricCard
                    title="Current Churn Rate"
                    value={`${churnMetrics?.currentChurnRate.toFixed(2) || "0.00"}%`}
                    icon={TrendingDown}
                    description="monthly churn"
                />
                <MetricCard
                    title="ARR"
                    value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(arr)}
                    icon={TrendingUp}
                    description="Annual Run Rate"
                />
                <MetricCard
                    title="Active Customers"
                    value={metrics?.activeCustomers.toString() || "0"}
                    icon={Users}
                    description="paying subscribers"
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">MRR by Plan</h3>
                    {isLoadingPlan ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <MrrByPlanChart data={mrrByPlan || []} />
                    )}
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Churn Rate Trend (30 Days)</h3>
                    {isLoadingChurn ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <ChurnRateChart data={churnMetrics?.churnTrend || []} />
                    )}
                </div>
            </div>

            {/* Recent Movements Table */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent MRR Movements</h3>
                <MrrMovementsTable />
            </div>
        </div>
    );
}
