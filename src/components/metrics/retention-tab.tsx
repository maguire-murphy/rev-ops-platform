"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { CohortHeatmap } from "@/components/analytics/cohort-heatmap";
import { ChurnRateChart } from "@/components/dashboard/churn-rate-chart";
import { Loader2 } from "lucide-react";

export function RetentionTab() {
    const [cohortType, setCohortType] = useState<"revenue" | "customer">("revenue");

    const { data: revenueCohorts, isLoading: isLoadingRevenue } = api.mrr.getRevenueCohorts.useQuery();
    const { data: customerCohorts, isLoading: isLoadingCustomer } = api.mrr.getCustomerCohorts.useQuery();
    const { data: churnMetrics, isLoading: isLoadingChurn } = api.mrr.getChurnMetrics.useQuery();

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Retention & Cohort Analysis</h3>

            {/* Churn Rate Card */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <h4 className="text-lg font-medium">Churn Rate Trend (30 Days)</h4>
                    <p className="text-sm text-slate-500">
                        Daily churn rate based on MRR snapshots.
                    </p>
                </div>
                {isLoadingChurn ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="text-2xl font-bold">
                            {churnMetrics?.currentChurnRate.toFixed(2)}%
                            <span className="text-sm font-normal text-slate-500 ml-2">current rate</span>
                        </div>
                        <ChurnRateChart data={churnMetrics?.churnTrend || []} />
                    </div>
                )}
            </div>

            {/* Cohort Analysis */}
            <div className="space-y-4">
                {/* Cohort Type Tabs */}
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Cohort Tabs">
                        <button
                            onClick={() => setCohortType("revenue")}
                            className={`${cohortType === "revenue"
                                ? "border-yellow-primary text-navy-rich"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Revenue Retention
                        </button>
                        <button
                            onClick={() => setCohortType("customer")}
                            className={`${cohortType === "customer"
                                ? "border-yellow-primary text-navy-rich"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Customer Retention
                        </button>
                    </nav>
                </div>

                {/* Cohort Content */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    {cohortType === "revenue" ? (
                        isLoadingRevenue ? (
                            <div className="text-center py-8 text-slate-500">Loading revenue cohorts...</div>
                        ) : (
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium">Net Revenue Retention by Cohort</h4>
                                <p className="text-sm text-slate-500">
                                    Percentage of initial MRR retained over time. Values &gt; 100% indicate net expansion.
                                </p>
                                <CohortHeatmap data={revenueCohorts || []} type="revenue" />
                            </div>
                        )
                    ) : (
                        isLoadingCustomer ? (
                            <div className="text-center py-8 text-slate-500">Loading customer cohorts...</div>
                        ) : (
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium">Customer Retention by Cohort</h4>
                                <p className="text-sm text-slate-500">
                                    Percentage of customers retained over time.
                                </p>
                                <CohortHeatmap data={customerCohorts || []} type="customer" />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
