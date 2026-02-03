"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#0A1628", "#1E3A5F", "#FFD93D", "#8B9DC3", "#FFF4CC"];

interface MrrByPlanChartProps {
    data: { name: string; value: number }[];
}

export function MrrByPlanChart({ data }: MrrByPlanChartProps) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#1E3A5F"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "MRR"]}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
