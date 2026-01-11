"use client";

import { api } from "@/trpc/react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MrrChart } from "@/components/dashboard/mrr-chart";
import { DollarSign, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    const { data: metrics, isLoading: isLoadingMetrics } = api.mrr.getDashboardMetrics.useQuery();
    const { data: history, isLoading: isLoadingHistory } = api.mrr.getMrrHistory.useQuery();

    if (isLoadingMetrics || isLoadingHistory) {
        return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;
    }

    const totalMrr = metrics?.totalMrr ? metrics.totalMrr / 100 : 0;
    const arr = metrics?.arr ? metrics.arr / 100 : 0;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total MRR"
                    value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalMrr)}
                    icon={DollarSign}
                    trend={metrics?.mrrGrowth}
                    description="from last month"
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

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <div className="col-span-4">
                    <MrrChart data={history || []} />
                </div>
            </div>
        </div>
    );
}
