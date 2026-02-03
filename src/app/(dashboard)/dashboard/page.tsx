"use client";

import { api } from "@/trpc/react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MrrChart } from "@/components/dashboard/mrr-chart";
import { DollarSign, Users, TrendingUp, RefreshCcw, BarChart3 } from "lucide-react";
import { SkeletonCard, SkeletonChart } from "@/components/ui/skeleton";
import { NoStripeConnectionState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";

export default function DashboardPage() {
    const {
        data: metrics,
        isLoading: isLoadingMetrics,
        error: metricsError,
        refetch: refetchMetrics,
    } = api.mrr.getDashboardMetrics.useQuery();
    const {
        data: history,
        isLoading: isLoadingHistory,
        error: historyError,
        refetch: refetchHistory,
    } = api.mrr.getMrrHistory.useQuery();
    const { data: integrationStatus } = api.integrations.getStatus.useQuery();

    const isLoading = isLoadingMetrics || isLoadingHistory;
    const hasError = metricsError || historyError;

    const handleRetry = () => {
        refetchMetrics();
        refetchHistory();
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
                <SkeletonChart />
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <div className="rounded-xl border bg-white shadow-sm">
                    <ErrorState
                        title="Failed to load dashboard data"
                        message="We couldn't load your metrics. This might be a temporary issue."
                        onRetry={handleRetry}
                    />
                </div>
            </div>
        );
    }

    // Show empty state if Stripe is not connected
    if (!integrationStatus?.stripeConnected) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <div className="rounded-xl border bg-white shadow-sm">
                    <NoStripeConnectionState />
                </div>
            </div>
        );
    }

    const totalMrr = metrics?.totalMrr ? metrics.totalMrr / 100 : 0;
    const arr = metrics?.arr ? metrics.arr / 100 : 0;

    // Show friendly state if connected but no data yet
    const hasNoData = totalMrr === 0 && (!history || history.length === 0);

    if (hasNoData) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <button
                        onClick={handleRetry}
                        className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Refresh
                    </button>
                </div>
                <div className="rounded-xl border bg-white p-8 shadow-sm text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-soft mb-4">
                        <DollarSign className="h-8 w-8 text-navy-deep" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Syncing Your Data</h3>
                    <p className="mt-2 max-w-md mx-auto text-sm text-slate-600">
                        Your Stripe connection is active! We're syncing your subscription data.
                        This may take a few minutes for the first sync.
                    </p>
                    <p className="mt-4 text-xs text-slate-500">
                        Try refreshing the page or check back in a few minutes.
                    </p>
                </div>
            </div>
        );
    }

    // Calculate ARPU
    const arpu = metrics?.activeCustomers && metrics.activeCustomers > 0
        ? totalMrr / metrics.activeCustomers
        : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Refresh
                </button>
            </div>
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
                <MetricCard
                    title="ARPU"
                    value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(arpu)}
                    icon={BarChart3}
                    description="Avg Revenue Per User"
                />
            </div>

            <div className="rounded-xl border bg-white shadow-sm">
                <MrrChart data={history || []} />
            </div>
        </div>
    );
}
