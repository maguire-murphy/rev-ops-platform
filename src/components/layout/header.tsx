"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { UserMenu } from "@/components/layout/user-menu";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";

const PAGE_TITLES: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/customers": "Customers",
    "/metrics": "Metrics",
    "/forecast": "Revenue Forecast",
    "/pipeline": "Pipeline Intelligence",
    "/settings": "Settings",
};

export function Header() {
    const pathname = usePathname();
    const { toggle } = useMobileMenu();

    const title = PAGE_TITLES[pathname] || "Dashboard";

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggle}
                    className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6 text-slate-600" />
                </button>
                <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            </div>
            <UserMenu />
        </header>
    );
}
