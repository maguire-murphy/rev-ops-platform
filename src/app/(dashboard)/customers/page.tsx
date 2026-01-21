"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { SkeletonTable } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { NoCustomersState } from "@/components/ui/empty-state";
import { ChevronLeft, ChevronRight, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type SortField = "name" | "mrr" | "date";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 25;

export default function CustomersPage() {
    const { data: customers, isLoading, error, refetch } = api.customer.getAll.useQuery();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    // Filter customers
    const filteredCustomers = useMemo(() => {
        if (!customers) return [];
        
        return customers.filter((c) => {
            const matchesSearch = 
                c.name?.toLowerCase().includes(search.toLowerCase()) ||
                c.email?.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "all" || c.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [customers, search, statusFilter]);

    // Sort customers
    const sortedCustomers = useMemo(() => {
        return [...filteredCustomers].sort((a, b) => {
            let comparison = 0;
            
            if (sortField === "name") {
                comparison = (a.name || "").localeCompare(b.name || "");
            } else if (sortField === "mrr") {
                comparison = a.currentMrr - b.currentMrr;
            } else if (sortField === "date") {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            
            return sortDirection === "asc" ? comparison : -comparison;
        });
    }, [filteredCustomers, sortField, sortDirection]);

    // Paginate
    const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);
    const paginatedCustomers = sortedCustomers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setCurrentPage(1);
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ArrowUpDown className="h-4 w-4 text-slate-400" />;
        return sortDirection === "asc" 
            ? <ArrowUp className="h-4 w-4 text-indigo-600" />
            : <ArrowDown className="h-4 w-4 text-indigo-600" />;
    };

    if (error) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                <div className="rounded-xl border bg-white shadow-sm">
                    <ErrorState
                        title="Failed to load customers"
                        message="We couldn't load your customer list. Please try again."
                        onRetry={refetch}
                    />
                </div>
            </div>
        );
    }

    // Show empty state if no customers at all (not just filtered)
    if (!isLoading && (!customers || customers.length === 0)) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                <div className="rounded-xl border bg-white shadow-sm">
                    <NoCustomersState />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with search and filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="block w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="block w-full sm:w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="churned">Churned</option>
                        <option value="at-risk">At Risk</option>
                    </select>
                    {(search || statusFilter !== "all") && (
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        >
                            <X className="h-4 w-4" />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {isLoading ? (
                <SkeletonTable rows={8} />
            ) : paginatedCustomers.length === 0 ? (
                <div className="rounded-xl border bg-white p-8 text-center text-muted-foreground">
                    <p>No customers match your filters.</p>
                    <button
                        onClick={clearFilters}
                        className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="p-4">
                                        <button 
                                            onClick={() => handleSort("name")}
                                            className="flex items-center gap-1 hover:text-slate-900"
                                        >
                                            Name
                                            <SortIcon field="name" />
                                        </button>
                                    </th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">
                                        <button 
                                            onClick={() => handleSort("mrr")}
                                            className="flex items-center gap-1 ml-auto hover:text-slate-900"
                                        >
                                            Current MRR
                                            <SortIcon field="mrr" />
                                        </button>
                                    </th>
                                    <th className="p-4 text-right">
                                        <button 
                                            onClick={() => handleSort("date")}
                                            className="flex items-center gap-1 ml-auto hover:text-slate-900"
                                        >
                                            Joined
                                            <SortIcon field="date" />
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCustomers.map((customer) => (
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedCustomers.length)} of {sortedCustomers.length} customers
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </button>
                                <span className="text-sm text-slate-600">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
