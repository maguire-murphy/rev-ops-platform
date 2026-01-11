"use client";

import { useState } from "react";
import { MetricsTabs } from "@/components/metrics/metrics-tabs";
import { OverviewTab } from "@/components/metrics/overview-tab";
import { MrrAnalysisTab } from "@/components/metrics/mrr-analysis-tab";
import { RetentionTab } from "@/components/metrics/retention-tab";

export default function MetricsPage() {
    const [activeTab, setActiveTab] = useState<"overview" | "mrr" | "retention">("overview");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Metrics</h2>
                <p className="text-slate-600">Comprehensive analytics for your revenue and retention</p>
            </div>

            <MetricsTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-6">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "mrr" && <MrrAnalysisTab />}
                {activeTab === "retention" && <RetentionTab />}
            </div>
        </div>
    );
}
