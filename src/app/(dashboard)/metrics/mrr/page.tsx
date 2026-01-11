"use client";

import { api } from "@/trpc/react";
import { MrrMovementsTable } from "@/components/dashboard/mrr-movements-table";
import { MrrByPlanChart } from "@/components/dashboard/mrr-by-plan-chart";
import { Loader2 } from "lucide-react";

export default function MrrPage() {
    const { data: mrrByPlan, isLoading } = api.mrr.getMrrByPlan.useQuery();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">MRR Analytics</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">MRR by Plan</h3>
                    {isLoading ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <MrrByPlanChart data={mrrByPlan || []} />
                    )}
                </div>

                {/* Placeholder for future charts or metrics */}
                <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center justify-center text-slate-500">
                    More insights coming soon...
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Movements</h3>
                <MrrMovementsTable />
            </div>
        </div>
    );
}
