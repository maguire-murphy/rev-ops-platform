"use client";

import { api } from "@/trpc/react";
import { MrrMovementsTable } from "@/components/dashboard/mrr-movements-table";
import { MrrByPlanChart } from "@/components/dashboard/mrr-by-plan-chart";
import { Loader2 } from "lucide-react";

export function MrrAnalysisTab() {
    const { data: mrrByPlan, isLoading } = api.mrr.getMrrByPlan.useQuery();

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">MRR Breakdown & Analysis</h3>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h4 className="text-lg font-semibold mb-4">MRR by Plan</h4>
                    {isLoading ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <MrrByPlanChart data={mrrByPlan || []} />
                    )}
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h4 className="text-lg font-semibold mb-4">Plan Distribution</h4>
                    {isLoading ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {mrrByPlan?.map((plan) => (
                                <div key={plan.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-slate-900">{plan.name}</p>
                                        <p className="text-sm text-slate-500">Plan</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900">
                                            ${plan.value.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-slate-500">MRR</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold">All MRR Movements</h4>
                <MrrMovementsTable />
            </div>
        </div>
    );
}
