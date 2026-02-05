import Link from "next/link";
import { Zap, Settings, HelpCircle, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Documentation",
    description: "Documentation for Beacon. Guides for setup, integrations, features, and more.",
    path: "/docs",
});

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-navy-rich hover:text-yellow-primary transition-colors font-medium">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-navy-deep sm:text-5xl">
                    Documentation
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Everything you need to get started with Beacon and tracking your SaaS metrics.
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Getting Started */}
                    <Link
                        href="/docs/getting-started"
                        className="group relative rounded-xl border border-slate-200 p-8 hover:border-yellow-primary hover:shadow-lg transition-all bg-white"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-primary/10 group-hover:bg-yellow-primary transition-colors">
                            <Zap className="h-6 w-6 text-yellow-600 group-hover:text-navy-deep transition-colors" />
                        </div>
                        <h2 className="mt-6 text-xl font-bold text-navy-deep group-hover:text-yellow-primary transition-colors">
                            Getting Started
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                            Quick start guide to set up your account, connect integrations, and view your first metrics.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy-rich group-hover:text-yellow-primary transition-colors">
                            Read guide <ArrowRight className="h-4 w-4" />
                        </div>
                    </Link>

                    {/* Integrations */}
                    <div className="rounded-xl border border-slate-200 p-8 bg-white">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                            <Settings className="h-6 w-6 text-slate-600" />
                        </div>
                        <h2 className="mt-6 text-xl font-bold text-navy-deep">
                            Integrations
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed mb-4">
                            Learn how to connect and sync your data sources.
                        </p>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/docs/integrations/stripe" className="flex items-center gap-2 text-sm text-navy-rich hover:text-yellow-primary font-medium transition-colors">
                                    <ArrowRight className="h-3 w-3" />
                                    Stripe Integration
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/integrations/hubspot" className="flex items-center gap-2 text-sm text-navy-rich hover:text-yellow-primary font-medium transition-colors">
                                    <ArrowRight className="h-3 w-3" />
                                    HubSpot Integration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* FAQ */}
                    <Link
                        href="/faq"
                        className="group relative rounded-xl border border-slate-200 p-8 hover:border-yellow-primary hover:shadow-lg transition-all bg-white"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-yellow-primary transition-colors">
                            <HelpCircle className="h-6 w-6 text-slate-600 group-hover:text-navy-deep transition-colors" />
                        </div>
                        <h2 className="mt-6 text-xl font-bold text-navy-deep group-hover:text-yellow-primary transition-colors">
                            FAQ
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                            Answers to common questions about features, integrations, and technical implementation.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy-rich group-hover:text-yellow-primary transition-colors">
                            View FAQ <ArrowRight className="h-4 w-4" />
                        </div>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-16 pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-navy-deep mb-6">Quick Links</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/contact" className="flex items-center gap-2 text-sm text-slate-600 hover:text-yellow-primary font-medium transition-colors">
                            <ArrowRight className="h-3 w-3" />
                            Contact Support
                        </Link>
                        <Link href="/terms" className="flex items-center gap-2 text-sm text-slate-600 hover:text-yellow-primary font-medium transition-colors">
                            <ArrowRight className="h-3 w-3" />
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="flex items-center gap-2 text-sm text-slate-600 hover:text-yellow-primary font-medium transition-colors">
                            <ArrowRight className="h-3 w-3" />
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
