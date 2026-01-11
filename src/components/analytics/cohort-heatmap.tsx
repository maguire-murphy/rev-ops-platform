"use client";

interface CohortData {
    cohort: string;
    initialSize: number;
    months: number[];
}

interface CohortHeatmapProps {
    data: CohortData[];
    type: "revenue" | "customer";
}

export function CohortHeatmap({ data, type }: CohortHeatmapProps) {
    // Helper to get color based on retention %
    const getColor = (percentage: number) => {
        // Red (0%) -> Yellow (50%) -> Green (100%)
        // Simple implementation:
        // If > 100% (Expansion), use dark green
        if (percentage >= 110) return "bg-emerald-600 text-white";
        if (percentage >= 100) return "bg-emerald-500 text-white";
        if (percentage >= 90) return "bg-emerald-400 text-slate-900";
        if (percentage >= 80) return "bg-emerald-300 text-slate-900";
        if (percentage >= 70) return "bg-emerald-200 text-slate-900";
        if (percentage >= 60) return "bg-yellow-200 text-slate-900";
        if (percentage >= 50) return "bg-yellow-300 text-slate-900";
        if (percentage >= 40) return "bg-orange-200 text-slate-900";
        if (percentage >= 20) return "bg-orange-300 text-slate-900";
        return "bg-red-200 text-slate-900";
    };

    const formatValue = (value: number) => {
        if (type === "revenue") {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }).format(value / 100);
        }
        return value.toString();
    };

    return (
        <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-muted/50 text-muted-foreground font-medium">
                    <tr>
                        <th className="p-3 border-b min-w-[100px]">Cohort</th>
                        <th className="p-3 border-b min-w-[80px]">Initial</th>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <th key={i} className="p-3 border-b text-center min-w-[60px]">
                                M{i}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.cohort} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="p-3 font-medium bg-white sticky left-0 z-10 border-r">
                                {row.cohort}
                            </td>
                            <td className="p-3 bg-white border-r">
                                {formatValue(row.initialSize)}
                            </td>
                            {row.months.map((value, i) => {
                                const percentage = row.initialSize > 0 ? (value / row.initialSize) * 100 : 0;
                                return (
                                    <td
                                        key={i}
                                        className={`p-3 text-center border-r last:border-0 ${getColor(percentage)}`}
                                        title={`${percentage.toFixed(1)}%`}
                                    >
                                        {percentage.toFixed(0)}%
                                    </td>
                                );
                            })}
                            {/* Fill remaining cells if less than 12 months */}
                            {Array.from({ length: 12 - row.months.length }).map((_, i) => (
                                <td key={`empty-${i}`} className="p-3 bg-slate-50 border-r last:border-0"></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
