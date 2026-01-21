"use client";

import Link from "next/link";
import { Menu, X, BarChart2 } from "lucide-react";
import { useState } from "react";

export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-900 hover:opacity-90 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                        <BarChart2 className="h-5 w-5" />
                    </div>
                    <span>RevOps Analytics</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                        Pricing
                    </Link>
                    <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                        Docs
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-slate-900 hover:text-brand-600 transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-all hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-6 py-6 shadow-lg">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="#features"
                            className="text-base font-medium text-slate-900"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-base font-medium text-slate-900"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            className="text-base font-medium text-slate-900"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Docs
                        </Link>
                        <hr className="border-slate-100" />
                        <Link
                            href="/login"
                            className="text-base font-medium text-slate-900"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="flex w-full justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-base font-semibold text-white hover:bg-brand-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
