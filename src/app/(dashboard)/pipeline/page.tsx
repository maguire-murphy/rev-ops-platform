"use client";

import { api } from "@/trpc/react";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { Loader2, DollarSign, Briefcase, TrendingUp, BarChart3, type LucideIcon } from "lucide-react";

export default function PipelinePage() {
    const { data: metrics, isLoading } = api.deals.getMetrics.useQuery();

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pipeline</h1>
                <div className="flex items-center gap-2">
                    {/* Add filters or actions here later */}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="flex-1 min-h-0 overflow-hidden">
                <PipelineBoard />
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon }: { title: string; value: string; icon: LucideIcon }) {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                    <Icon className="h-4 w-4 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
            </div>
            <div className="mt-3">
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}
