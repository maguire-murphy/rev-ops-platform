"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { useState } from "react";

export default function CustomersPage() {
    const { data: customers, isLoading } = api.customer.getAll.useQuery();
    const [search, setSearch] = useState("");

    const filteredCustomers = customers?.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                <div className="mt-4 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-white">
                {isLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading customers...</div>
                ) : !filteredCustomers || filteredCustomers.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No customers found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Current MRR</th>
                                    <th className="p-4 text-right">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="p-4">
                                            <Link href={`/customers/${customer.id}`} className="font-medium hover:underline text-indigo-600">
                                                {customer.name || "Unknown"}
                                            </Link>
                                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${customer.status === "active"
                                                    ? "bg-green-100 text-green-800"
                                                    : customer.status === "churned"
                                                        ? "bg-red-100 text-red-800"
                                                        : customer.status === "at-risk"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {customer.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-mono">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(customer.currentMrr / 100)}
                                        </td>
                                        <td className="p-4 text-right text-muted-foreground">
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
