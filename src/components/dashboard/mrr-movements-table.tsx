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
        <div className="rounded-md border">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium">
                    <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Type</th>
                        <th className="p-4 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map((movement) => (
                        <tr key={movement.id} className="border-t hover:bg-muted/50">
                            <td className="p-4">
                                {new Date(movement.effectiveDate).toLocaleDateString()}
                            </td>
                            <td className="p-4 font-medium">
                                {movement.customer?.name || "Unknown"}
                            </td>
                            <td className="p-4">
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
                            <td className="p-4 text-right font-mono">
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
