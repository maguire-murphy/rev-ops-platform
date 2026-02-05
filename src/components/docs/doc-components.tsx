"use client";

import { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle2, Lightbulb, Shield } from "lucide-react";

// Step Badge - Yellow numbered circle for step indicators
interface StepBadgeProps {
    number: number;
    size?: "sm" | "md" | "lg";
}

export function StepBadge({ number, size = "md" }: StepBadgeProps) {
    const sizeClasses = {
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
    };

    return (
        <span
            className={`inline-flex items-center justify-center ${sizeClasses[size]} rounded-full bg-yellow-primary text-navy-deep font-bold flex-shrink-0`}
        >
            {number}
        </span>
    );
}

// Info Box - Callout boxes for important information
type InfoBoxVariant = "info" | "tip" | "warning" | "success" | "security";

interface InfoBoxProps {
    title: string;
    children: ReactNode;
    variant?: InfoBoxVariant;
}

const variantConfig = {
    info: {
        icon: Info,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-400",
        iconColor: "text-blue-500",
        titleColor: "text-blue-900",
    },
    tip: {
        icon: Lightbulb,
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-primary",
        iconColor: "text-yellow-600",
        titleColor: "text-yellow-900",
    },
    warning: {
        icon: AlertTriangle,
        bgColor: "bg-orange-50",
        borderColor: "border-orange-400",
        iconColor: "text-orange-500",
        titleColor: "text-orange-900",
    },
    success: {
        icon: CheckCircle2,
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-400",
        iconColor: "text-emerald-500",
        titleColor: "text-emerald-900",
    },
    security: {
        icon: Shield,
        bgColor: "bg-slate-100",
        borderColor: "border-navy-rich",
        iconColor: "text-navy-rich",
        titleColor: "text-navy-deep",
    },
};

export function InfoBox({ title, children, variant = "info" }: InfoBoxProps) {
    const config = variantConfig[variant];
    const Icon = config.icon;

    return (
        <div
            className={`not-prose rounded-lg ${config.bgColor} border-l-4 ${config.borderColor} p-5 my-6`}
        >
            <div className={`flex items-center gap-2 font-semibold ${config.titleColor} mb-2`}>
                <Icon className={`h-5 w-5 ${config.iconColor}`} />
                {title}
            </div>
            <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
        </div>
    );
}

// Doc Table - Styled table for data comparisons
interface DocTableProps {
    headers: string[];
    rows: string[][];
}

export function DocTable({ headers, rows }: DocTableProps) {
    return (
        <div className="not-prose my-6 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                <thead>
                    <tr className="bg-slate-100 border-b-2 border-slate-200">
                        {headers.map((header, i) => (
                            <th
                                key={i}
                                className="text-left p-4 text-navy-deep font-bold text-sm uppercase tracking-wide"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className="border-b border-slate-200 last:border-0 bg-white hover:bg-slate-50 transition-colors"
                        >
                            {row.map((cell, j) => (
                                <td key={j} className="p-4 text-slate-700 text-sm">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Section Divider
export function SectionDivider() {
    return (
        <div className="not-prose my-10">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>
    );
}

// Step Item - A step with number badge and content
interface StepItemProps {
    number: number;
    title: string;
    children: ReactNode;
}

export function StepItem({ number, title, children }: StepItemProps) {
    return (
        <div className="not-prose flex gap-4 mb-6">
            <StepBadge number={number} />
            <div className="flex-1">
                <h3 className="text-lg font-bold text-navy-deep mb-2">{title}</h3>
                <div className="text-slate-700 leading-relaxed text-base">{children}</div>
            </div>
        </div>
    );
}

// Numbered List Item with yellow marker
interface NumberedItemProps {
    number: number;
    children: ReactNode;
}

export function NumberedItem({ number, children }: NumberedItemProps) {
    return (
        <li className="flex items-start gap-3 mb-3 list-none">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">
                {number}
            </span>
            <span className="text-slate-700">{children}</span>
        </li>
    );
}

// Code inline
interface InlineCodeProps {
    children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
    return (
        <code className="bg-slate-100 text-navy-rich px-2 py-1 rounded text-sm font-mono">
            {children}
        </code>
    );
}
