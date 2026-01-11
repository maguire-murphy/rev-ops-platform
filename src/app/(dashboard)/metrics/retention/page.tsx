"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { CohortHeatmap } from "@/components/analytics/cohort-heatmap";

import { ChurnRateChart } from "@/components/dashboard/churn-rate-chart";
import { Loader2 } from "lucide-react";

export default function RetentionPage() {
    const [activeTab, setActiveTab] = useState<"revenue" | "customer">("revenue");

    const { data: revenueCohorts, isLoading: isLoadingRevenue } = api.mrr.getRevenueCohorts.useQuery();
    const { data: customerCohorts, isLoading: isLoadingCustomer } = api.mrr.getCustomerCohorts.useQuery();
    const { data: churnMetrics, isLoading: isLoadingChurn } = api.mrr.getChurnMetrics.useQuery();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Retention Analysis</h2>
            </div>

            {/* Churn Rate Card */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Churn Rate Trend (30 Days)</h3>
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

            <div className="space-y-4">
                {/* Custom Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab("revenue")}
                            className={`${activeTab === "revenue"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Revenue Retention
                        </button>
                        <button
                            onClick={() => setActiveTab("customer")}
                            className={`${activeTab === "customer"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Customer Retention
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    {activeTab === "revenue" ? (
                        isLoadingRevenue ? (
                            <div className="text-center py-8 text-muted-foreground">Loading revenue cohorts...</div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Net Revenue Retention by Cohort</h3>
                                <p className="text-sm text-muted-foreground">
                                    Percentage of initial MRR retained over time. Values {'>'} 100% indicate net expansion.
                                </p>
                                <CohortHeatmap data={revenueCohorts || []} type="revenue" />
                            </div>
                        )
                    ) : (
                        isLoadingCustomer ? (
                            <div className="text-center py-8 text-muted-foreground">Loading customer cohorts...</div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Customer Retention by Cohort</h3>
                                <p className="text-sm text-muted-foreground">
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
