"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";
import {
    BarChart3,
    Users,
    LayoutDashboard,
    Settings,
    LineChart,
    Target,
    X,
    Home,
    ExternalLink,
} from "lucide-react";
import { LighthouseIcon } from "@/components/LighthouseIcon";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Metrics", href: "/metrics", icon: BarChart3 },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Pipeline", href: "/pipeline", icon: Target },
    { name: "Forecast", href: "/forecast", icon: LineChart },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { isOpen, setIsOpen } = useMobileMenu();

    const handleNavigate = () => {
        // Close mobile menu when navigating
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed md:static inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-white/10 bg-navy-deep text-white transition-transform duration-300 md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo & Mobile close button */}
                <div className="flex h-16 items-center justify-between px-6 md:justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
                        title="Back to Landing Page"
                    >
                        <div className="h-8 w-8 rounded-lg bg-navy-rich border border-white/10 flex items-center justify-center">
                            <LighthouseIcon className="h-6 w-6" />
                        </div>
                        <span className="hidden lg:inline">Beacon</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={handleNavigate}
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
                {/* Project Overview Link */}
                <div className="px-3 pb-2">
                    <Link
                        href="/"
                        onClick={handleNavigate}
                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <Home className="mr-3 h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-white" />
                        Project Overview
                        <ExternalLink className="ml-auto h-3 w-3 text-slate-600 group-hover:text-slate-400" />
                    </Link>
                </div>

                <div className="border-t border-slate-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                            {session?.user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ||
                                session?.user?.email?.slice(0, 2).toUpperCase() || "U"}
                        </div>
                        <div className="text-sm overflow-hidden">
                            <p className="font-medium truncate">{session?.user?.name || session?.user?.email?.split("@")[0] || "User"}</p>
                            <p className="text-xs text-slate-500 truncate">{session?.user?.email || ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
