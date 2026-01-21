"use client";

import Link from "next/link";
import { AlertCircle, CreditCard, Users, BarChart3, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        href: string;
    };
}

export function EmptyState({ icon: Icon = AlertCircle, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                <Icon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>
            {action && (
                <Link
                    href={action.href}
                    className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                    {action.label}
                </Link>
            )}
        </div>
    );
}

// Pre-configured empty states
export function NoStripeConnectionState() {
    return (
        <EmptyState
            icon={CreditCard}
            title="Connect Stripe to Get Started"
            description="Connect your Stripe account to sync your subscription data and see your MRR, ARR, and customer metrics."
            action={{
                label: "Connect Stripe",
                href: "/settings",
            }}
        />
    );
}

export function NoCustomersState() {
    return (
        <EmptyState
            icon={Users}
            title="No Customers Yet"
            description="Your customer data will appear here once you connect Stripe and sync your subscriptions."
            action={{
                label: "Connect Stripe",
                href: "/settings",
            }}
        />
    );
}

export function NoDataState({ message = "No data available" }: { message?: string }) {
    return (
        <EmptyState
            icon={BarChart3}
            title="No Data Available"
            description={message}
        />
    );
}
