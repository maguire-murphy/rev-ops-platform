"use client";

import { Bell } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                    <Bell className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
