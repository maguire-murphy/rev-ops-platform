"use client";

import { cn } from "@/lib/utils";
import { BarChart3, TrendingDown, Users2 } from "lucide-react";

interface MetricsTabsProps {
    activeTab: "overview" | "mrr" | "retention";
    onTabChange: (tab: "overview" | "mrr" | "retention") => void;
}

const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "mrr" as const, label: "MRR Analysis", icon: TrendingDown },
    { id: "retention" as const, label: "Retention & Cohorts", icon: Users2 },
];

export function MetricsTabs({ activeTab, onTabChange }: MetricsTabsProps) {
    return (
        <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "group inline-flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium transition-colors",
                                isActive
                                    ? "border-indigo-500 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-indigo-500" : "text-slate-400 group-hover:text-slate-500")} />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
