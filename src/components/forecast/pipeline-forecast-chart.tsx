"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface PipelineForecastData {
    date: string;
    weightedValue: number;
    totalValue: number;
}

interface PipelineForecastChartProps {
    data: PipelineForecastData[];
}

export function PipelineForecastChart({ data }: PipelineForecastChartProps) {
    const chartData = data.map(d => ({
        ...d,
        formattedDate: new Date(d.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        "Weighted Value": d.weightedValue / 100,
        "Total Value": d.totalValue / 100,
    }));

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
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
                    <Bar dataKey="Total Value" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Weighted Value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
