"use client";

import { api } from "@/trpc/react";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { Loader2, DollarSign, Briefcase, TrendingUp, BarChart3, Link2, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { ErrorState } from "@/components/ui/error-state";

export default function PipelinePage() {
    const { data: metrics, isLoading, error, refetch } = api.deals.getMetrics.useQuery();
    const { data: integrationStatus } = api.integrations.getStatus.useQuery();

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col h-full space-y-6 p-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline</h1>
                <div className="rounded-xl border bg-white shadow-sm">
                    <ErrorState
                        title="Failed to load pipeline data"
                        message="We couldn't load your pipeline. Please try again."
                        onRetry={refetch}
                    />
                </div>
            </div>
        );
    }

    // Show empty state if HubSpot is not connected
    if (!integrationStatus?.hubspotConnected) {
        return (
            <div className="flex flex-col h-full space-y-6 p-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline</h1>
                <div className="rounded-xl border bg-white p-12 shadow-sm">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff7a59]/10 mb-4">
                            <Link2 className="h-8 w-8 text-[#ff7a59]" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Connect HubSpot to See Your Pipeline</h3>
                        <p className="mt-2 max-w-md text-sm text-slate-600">
                            Connect your HubSpot account to view deal stages, track pipeline value, and monitor sales velocity.
                        </p>
                        <Link
                            href="/settings"
                            className="mt-6 inline-flex items-center rounded-md bg-[#ff7a59] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#ff8f73] transition-colors"
                        >
                            Connect HubSpot
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-6 p-6 min-h-screen md:h-full">
            <div className="flex items-center justify-between flex-shrink-0">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline</h1>
                <div className="flex items-center gap-2">
                    {/* Add filters or actions here later */}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 flex-shrink-0">
                <MetricCard
                    title="Total Pipeline Value"
                    value={`$${(metrics?.totalPipelineValue ? metrics.totalPipelineValue / 100 : 0).toLocaleString()}`}
                    icon={DollarSign}
                />
                <MetricCard
                    title="Open Deals"
                    value={metrics?.openDealsCount.toString() || "0"}
                    icon={Briefcase}
                />
                <MetricCard
                    title="Avg. Deal Size"
                    value={`$${(metrics?.avgDealSize ? metrics.avgDealSize / 100 : 0).toLocaleString()}`}
                    icon={BarChart3}
                />
                <MetricCard
                    title="Win Rate"
                    value={`${metrics?.winRate.toFixed(1)}%`}
                    icon={TrendingUp}
                />
            </div>

            <div className="flex-1 min-h-[600px] md:min-h-0 overflow-hidden">
                <PipelineBoard />
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon }: { title: string; value: string; icon: LucideIcon }) {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-soft rounded-lg">
                    <Icon className="h-4 w-4 text-navy-deep" />
                </div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
            </div>
            <div className="mt-3">
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}
