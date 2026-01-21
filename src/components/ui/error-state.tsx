"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCcw, Mail } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    showSupport?: boolean;
}

export function ErrorState({
    title = "Something went wrong",
    message = "We encountered an error while loading this data. Please try again.",
    onRetry,
    showSupport = true,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-slate-600">{message}</p>
            <div className="mt-6 flex items-center gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Try Again
                    </button>
                )}
                {showSupport && (
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        <Mail className="h-4 w-4" />
                        Contact Support
                    </Link>
                )}
            </div>
        </div>
    );
}
