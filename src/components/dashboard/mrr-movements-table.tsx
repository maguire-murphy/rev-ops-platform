"use client";

import { api } from "@/trpc/react";

export function MrrMovementsTable() {
    const { data: movements, isLoading } = api.mrr.getMovements.useQuery();

    if (isLoading) {
        return <div className="p-4 text-center">Loading movements...</div>;
    }

    if (!movements || movements.length === 0) {
        return <div className="p-4 text-center text-muted-foreground">No movements found.</div>;
    }

    return (
        <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[600px]">
                <thead className="bg-slate-50 text-navy-deep font-bold border-b">
                    <tr>
                        <th className="p-4 whitespace-nowrap">Date</th>
                        <th className="p-4 whitespace-nowrap">Customer</th>
                        <th className="p-4 whitespace-nowrap">Type</th>
                        <th className="p-4 text-right whitespace-nowrap">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map((movement) => (
                        <tr key={movement.id} className="border-t hover:bg-muted/50">
                            <td className="p-4 whitespace-nowrap">
                                {new Date(movement.effectiveDate).toLocaleDateString()}
                            </td>
                            <td className="p-4 font-medium whitespace-nowrap">
                                {movement.customer?.name || "Unknown"}
                            </td>
                            <td className="p-4 whitespace-nowrap">
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${movement.movementType === "new"
                                        ? "bg-green-100 text-green-800"
                                        : movement.movementType === "expansion"
                                            ? "bg-blue-100 text-blue-800"
                                            : movement.movementType === "contraction"
                                                ? "bg-orange-100 text-orange-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {movement.movementType.toUpperCase()}
                                </span>
                            </td>
                            <td className="p-4 text-right font-mono whitespace-nowrap">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(movement.mrrAmount / 100)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
