"use client";

import Link from "next/link";
import { Menu, Play, X } from "lucide-react";
import { useState } from "react";
import { LighthouseIcon } from "@/components/LighthouseIcon";

export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-[1000] w-full border-b border-white/10 bg-navy-deep shadow-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:opacity-90 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-rich border border-white/10">
                        <LighthouseIcon className="h-6 w-6" />
                    </div>
                    <span>Beacon</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-base font-medium text-white hover:text-yellow-primary transition-colors">
                        Features
                    </Link>
                    <Link href="/docs" className="text-base font-medium text-white hover:text-yellow-primary transition-colors">
                        Documentation
                    </Link>
                    <Link href="https://github.com/maguire-murphy/rev-ops-platform" className="text-base font-medium text-white hover:text-yellow-primary transition-colors">
                        GitHub
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/signup"
                        className="flex items-center gap-2 rounded-lg bg-yellow-primary px-6 py-3 text-base font-semibold text-navy-deep shadow-md hover:bg-yellow-soft hover:shadow-lg transition-all"
                    >
                        <Play className="h-4 w-4 fill-current" />
                        Try Demo
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-navy-deep px-6 py-6 shadow-lg">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="#features"
                            className="text-base font-medium text-slate-300 hover:text-yellow-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-base font-medium text-slate-300 hover:text-yellow-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            className="text-base font-medium text-slate-300 hover:text-yellow-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Docs
                        </Link>
                        <hr className="border-white/10" />
                        <Link
                            href="/login"
                            className="text-base font-medium text-white hover:text-yellow-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="flex w-full justify-center rounded-lg bg-yellow-primary px-4 py-2.5 text-base font-semibold text-navy-deep hover:bg-yellow-soft"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Try Demo
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
