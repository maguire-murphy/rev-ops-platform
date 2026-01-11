"use client";

import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface AccuracyData {
    date: string;
    forecast: number;
    actual: number;
    accuracy: number;
}

interface ForecastAccuracyChartProps {
    data: AccuracyData[];
}

export function ForecastAccuracyChart({ data }: ForecastAccuracyChartProps) {
    const chartData = data.map(d => ({
        ...d,
        formattedDate: new Date(d.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        "Forecast": d.forecast / 100,
        "Actual Won": d.actual / 100,
    }));

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
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
                        yAxisId="left"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        formatter={(value: number, name: string) => [
                            name === "accuracy" ? `${value}%` : `$${value.toLocaleString()}`,
                            name
                        ]}
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Forecast" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar yAxisId="left" dataKey="Actual Won" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} />
                    <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Accuracy %" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
