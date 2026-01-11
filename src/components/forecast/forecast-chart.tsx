"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface ForecastData {
    date: string;
    mrr: number;
    type: "historical" | "projected";
}

interface ForecastChartProps {
    data: {
        conservative: ForecastData[];
        moderate: ForecastData[];
        aggressive: ForecastData[];
    };
    activeScenario: "conservative" | "moderate" | "aggressive";
    showAll: boolean;
}

export function ForecastChart({ data, activeScenario, showAll }: ForecastChartProps) {
    // Combine data for the chart. We assume all scenarios have the same dates.
    const chartData = data.moderate.map((d, index) => {
        const date = new Date(d.date);
        return {
            date: d.date,
            formattedDate: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
            conservative: data.conservative[index]?.mrr / 100,
            moderate: data.moderate[index]?.mrr / 100,
            aggressive: data.aggressive[index]?.mrr / 100,
            type: d.type,
        };
    });

    const scenarios = [
        { id: "conservative", name: "Conservative", color: "#94a3b8" },
        { id: "moderate", name: "Moderate", color: "#4f46e5" },
        { id: "aggressive", name: "Aggressive", color: "#94a3b8" },
    ];

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="formattedDate"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                        formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Legend />

                    {/* Conservative Line */}
                    {(showAll || activeScenario === "conservative") && (
                        <Line
                            type="monotone"
                            dataKey="conservative"
                            name="Conservative"
                            stroke={activeScenario === "conservative" ? "#4f46e5" : "#94a3b8"}
                            strokeWidth={activeScenario === "conservative" ? 3 : 1}
                            strokeDasharray={activeScenario === "conservative" ? "0" : "5 5"}
                            dot={activeScenario === "conservative" ? { r: 4, fill: "#4f46e5" } : false}
                            activeDot={{ r: 6 }}
                        />
                    )}

                    {/* Moderate Line */}
                    {(showAll || activeScenario === "moderate") && (
                        <Line
                            type="monotone"
                            dataKey="moderate"
                            name="Moderate"
                            stroke={activeScenario === "moderate" ? "#4f46e5" : "#94a3b8"}
                            strokeWidth={activeScenario === "moderate" ? 3 : 1}
                            strokeDasharray={activeScenario === "moderate" ? "0" : "5 5"}
                            dot={activeScenario === "moderate" ? { r: 4, fill: "#4f46e5" } : false}
                            activeDot={{ r: 6 }}
                        />
                    )}

                    {/* Aggressive Line */}
                    {(showAll || activeScenario === "aggressive") && (
                        <Line
                            type="monotone"
                            dataKey="aggressive"
                            name="Aggressive"
                            stroke={activeScenario === "aggressive" ? "#4f46e5" : "#94a3b8"}
                            strokeWidth={activeScenario === "aggressive" ? 3 : 1}
                            strokeDasharray={activeScenario === "aggressive" ? "0" : "5 5"}
                            dot={activeScenario === "aggressive" ? { r: 4, fill: "#4f46e5" } : false}
                            activeDot={{ r: 6 }}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
