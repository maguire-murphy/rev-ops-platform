"use client";

import { api } from "@/trpc/react";
import { Loader2, AlertTriangle } from "lucide-react";

const STAGES = [
    { id: "appointmentscheduled", label: "Appointment Scheduled" },
    { id: "qualifiedtobuy", label: "Qualified to Buy" },
    { id: "presentationscheduled", label: "Presentation Scheduled" },
    { id: "decisionmakerboughtin", label: "Decision Maker Bought-In" },
    { id: "contractsent", label: "Contract Sent" },
    { id: "closedwon", label: "Closed Won" },
    { id: "closedlost", label: "Closed Lost" },
];

export function PipelineBoard() {
    const { data: deals, isLoading } = api.deals.getPipeline.useQuery();

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    const getDealsByStage = (stageId: string) => {
        return deals?.filter((deal) => deal.stage === stageId) || [];
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 h-[600px] md:h-full">
            {STAGES.map((stage) => {
                const stageDeals = getDealsByStage(stage.id);
                const totalValue = stageDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0);

                return (
                    <div key={stage.id} className="w-80 min-w-[20rem] flex-shrink-0 flex flex-col rounded-lg bg-slate-50 border border-slate-200 h-full">
                        <div className="p-3 border-b border-slate-200 bg-white rounded-t-lg flex-shrink-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-sm text-slate-700">{stage.label}</h3>
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {stageDeals.length}
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                                ${(totalValue / 100).toLocaleString()}
                            </div>
                        </div>

                        <div className="p-2 flex-1 overflow-y-auto space-y-2 min-h-0">
                            {stageDeals.map((deal) => (
                                <div key={deal.id} className="bg-white p-3 rounded border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="font-medium text-sm text-slate-900 mb-1 truncate" title={deal.name || "Untitled Deal"}>
                                        {deal.name || "Untitled Deal"}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span className="font-semibold text-slate-700">
                                            ${(deal.amount ? deal.amount / 100 : 0).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {/* Health Dot */}
                                            {deal.health && (
                                                <div
                                                    className={`h-2 w-2 rounded-full ${deal.health === "Healthy" ? "bg-green-500" :
                                                        deal.health === "At Risk" ? "bg-red-500" : "bg-yellow-500"
                                                        }`}
                                                    title={`Health: ${deal.health} (Score: ${deal.score})`}
                                                />
                                            )}
                                            {/* Stalled Warning */}
                                            {deal.isStalled && (
                                                <span title="Stalled: No activity in >14 days">
                                                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-slate-500">
                                            {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : "-"}
                                        </span>
                                    </div>
                                    {deal.customer && (
                                        <div className="mt-2 text-xs text-slate-400 truncate border-t pt-2 border-slate-100">
                                            {deal.customer.name || deal.customer.companyName || "Unknown Customer"}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {stageDeals.length === 0 && (
                                <div className="text-center py-8 text-xs text-slate-400 italic">
                                    No deals
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
