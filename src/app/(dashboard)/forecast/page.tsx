"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { ForecastChart } from "@/components/forecast/forecast-chart";
import { PipelineForecastChart } from "@/components/forecast/pipeline-forecast-chart";
import { ForecastAccuracyChart } from "@/components/forecast/accuracy-chart";
import { Loader2, TrendingUp, AlertCircle } from "lucide-react";

export default function ForecastPage() {
    const [scenario, setScenario] = useState<"conservative" | "moderate" | "aggressive">("moderate");
    const [showAll, setShowAll] = useState(false);
    const { data: forecast, isLoading } = api.forecast.getMrrForecast.useQuery({
        months: 12,
    });
    const { data: pipelineForecast } = api.forecast.getPipelineForecast.useQuery();
    const { data: accuracyData } = api.forecast.getForecastAccuracy.useQuery();

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    const currentMrr = forecast?.moderate && forecast.moderate.length > 0 ? forecast.moderate[0].mrr : 0;
    const projectedMrr = forecast?.[scenario] && forecast[scenario].length > 0
        ? forecast[scenario][forecast[scenario].length - 1].mrr
        : 0;
    const growth = currentMrr > 0 ? ((projectedMrr - currentMrr) / currentMrr) * 100 : 0;

    return (
        <div className="flex flex-col h-full space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Revenue Forecast</h1>
                    <p className="text-sm text-slate-500">Projected MRR based on historical growth and churn.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="showAll"
                            checked={showAll}
                            onChange={(e) => setShowAll(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="showAll" className="text-sm font-medium text-gray-700">
                            Show all projections
                        </label>
                    </div>
                    <select
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value as "conservative" | "moderate" | "aggressive")}
                        className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="conservative">Conservative</option>
                        <option value="moderate">Moderate</option>
                        <option value="aggressive">Aggressive</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-indigo-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-500">Projected MRR (12mo)</p>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-bold text-slate-900">${(projectedMrr / 100).toLocaleString()}</p>
                        <p className={`text-xs font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}% growth
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border bg-blue-50 p-4 shadow-sm col-span-2 flex items-center">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-3" />
                    <p className="text-sm text-blue-700">
                        This forecast uses a <strong>{scenario}</strong> growth model based on your last 6 months of data.
                        {scenario === "conservative" && " It assumes 50% of your historical growth rate."}
                        {scenario === "moderate" && " It assumes your historical growth rate continues."}
                        {scenario === "aggressive" && " It assumes 150% of your historical growth rate."}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border bg-white p-6 shadow-sm min-h-[400px]">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">MRR Projection</h3>
                    {forecast && (
                        <ForecastChart
                            data={forecast}
                            activeScenario={scenario}
                            showAll={showAll}
                        />
                    )}
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm min-h-[400px]">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Weighted Pipeline Forecast</h3>
                    {pipelineForecast && <PipelineForecastChart data={pipelineForecast} />}
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm min-h-[400px] lg:col-span-2">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Forecast Accuracy (Last 6 Months)</h3>
                    {accuracyData && <ForecastAccuracyChart data={accuracyData} />}
                </div>
            </div>
        </div>
    );
}
