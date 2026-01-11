"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
    const { data: customer, isLoading } = api.customer.getById.useQuery({ id: params.id });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading customer details...</div>;
    }

    if (!customer) {
        return <div className="p-8 text-center text-muted-foreground">Customer not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/customers" className="p-2 rounded-full hover:bg-slate-100">
                    <ArrowLeft className="h-5 w-5 text-slate-500" />
                </Link>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold tracking-tight">{customer.name}</h2>
                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                </div>
                {customer.stripeCustomerId && (
                    <a
                        href={`https://dashboard.stripe.com/customers/${customer.stripeCustomerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        View in Stripe <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                )}
            </div>

            {/* Key Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="text-sm font-medium text-slate-500">Current MRR</div>
                    <div className="mt-2 text-2xl font-bold">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(customer.currentMrr / 100)}
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="text-sm font-medium text-slate-500">Status</div>
                    <div className="mt-2">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold ${customer.status === "active"
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
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="text-sm font-medium text-slate-500">Joined</div>
                    <div className="mt-2 text-2xl font-bold">
                        {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Subscriptions */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscriptions</h3>
                <div className="rounded-md border bg-white">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                            <tr>
                                <th className="p-4">Status</th>
                                <th className="p-4">Plan</th>
                                <th className="p-4 text-right">Amount</th>
                                <th className="p-4 text-right">Interval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.subscriptions.map((sub) => (
                                <tr key={sub.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-4">
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium">Subscription</td>
                                    <td className="p-4 text-right font-mono">
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(sub.amount / 100)}
                                    </td>
                                    <td className="p-4 text-right capitalize">{sub.billingInterval}</td>
                                </tr>
                            ))}
                            {customer.subscriptions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        No subscriptions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MRR History */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">MRR History</h3>
                <div className="rounded-md border bg-white">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Type</th>
                                <th className="p-4 text-right">Change</th>
                                <th className="p-4 text-right">New MRR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.mrrMovements.map((movement) => (
                                <tr key={movement.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-4">
                                        {new Date(movement.effectiveDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${movement.movementType === "new"
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
                                        {movement.mrrAmount > 0 ? "+" : ""}
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(movement.mrrAmount / 100)}
                                    </td>
                                    <td className="p-4 text-right font-mono">
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(movement.newMrr / 100)}
                                    </td>
                                </tr>
                            ))}
                            {customer.mrrMovements.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                        No history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
