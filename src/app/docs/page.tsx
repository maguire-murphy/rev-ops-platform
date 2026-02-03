import Link from "next/link";
import { BookOpen, Zap, Settings, HelpCircle } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Documentation",
    description: "Documentation for Beacon. Guides for setup, integrations, features, and more.",
    path: "/docs",
});

export default function DocsPage() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-yellow-primary hover:text-yellow-soft">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Documentation
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                    Everything you need to get started with Beacon and tracking your SaaS metrics.
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Getting Started */}
                    <Link
                        href="/docs/getting-started"
                        className="group relative rounded-lg border border-white/10 p-8 hover:border-yellow-primary/50 transition-colors bg-navy-rich"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 group-hover:bg-yellow-primary transition-colors">
                            <Zap className="h-6 w-6 text-yellow-primary group-hover:text-navy-deep transition-colors" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-white">
                            Getting Started
                        </h2>
                        <p className="mt-2 text-sm text-slate-300">
                            Quick start guide to set up your account, connect integrations, and view your first metrics.
                        </p>
                        <p className="mt-4 text-sm font-medium text-yellow-primary">
                            Read guide →
                        </p>
                    </Link>

                    {/* Integrations */}
                    {/* Integrations */}
                    <div className="rounded-lg border border-white/10 p-8 bg-navy-rich">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                            <Settings className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-white">
                            Integrations
                        </h2>
                        <p className="mt-2 text-sm text-slate-300 mb-4">
                            Learn how to connect and sync your data sources.
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs/integrations/stripe" className="text-sm text-yellow-primary hover:text-yellow-soft">
                                    → Stripe Integration
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/integrations/hubspot" className="text-sm text-yellow-primary hover:text-yellow-soft">
                                    → HubSpot Integration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* FAQ */}
                    {/* FAQ */}
                    <Link
                        href="/faq"
                        className="group relative rounded-lg border border-white/10 p-8 hover:border-yellow-primary/50 transition-colors bg-navy-rich"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 group-hover:bg-yellow-primary transition-colors">
                            <HelpCircle className="h-6 w-6 text-white group-hover:text-navy-deep transition-colors" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-white">
                            FAQ
                        </h2>
                        <p className="mt-2 text-sm text-slate-300">
                            Answers to common questions about this project, features, and technical implementation.
                        </p>
                        <p className="mt-4 text-sm font-medium text-yellow-primary">
                            View FAQ →
                        </p>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white">Quick Links</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/contact" className="text-sm text-slate-300 hover:text-yellow-primary">
                            → Contact Support
                        </Link>
                        <Link href="/terms" className="text-sm text-slate-300 hover:text-yellow-primary">
                            → Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-sm text-slate-300 hover:text-yellow-primary">
                            → Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
