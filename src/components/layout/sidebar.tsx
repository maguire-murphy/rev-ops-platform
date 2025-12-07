"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    Users,
    LayoutDashboard,
    Settings,
    LineChart,
    Target,
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Metrics", href: "/metrics/mrr", icon: BarChart3 },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Pipeline", href: "/pipeline", icon: Target },
    { name: "Forecast", href: "/forecast", icon: LineChart },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                        B
                    </div>
                    <span>Beacon</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-slate-800 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0",
                                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-white"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-700" />
                    <div className="text-sm">
                        <p className="font-medium">User Name</p>
                        <p className="text-xs text-slate-500">user@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
