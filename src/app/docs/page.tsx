import Link from "next/link";
import { BookOpen, Zap, Settings, HelpCircle } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Documentation",
    description: "Documentation for the RevOps Analytics platform. Guides for setup, integrations, features, and more.",
    path: "/docs",
});

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-brand-600 hover:text-brand-700">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Documentation
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Everything you need to get started with the platform and tracking your SaaS metrics.
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Getting Started */}
                    <Link
                        href="/docs/getting-started"
                        className="group relative rounded-lg border border-slate-200 p-8 hover:border-brand-600 transition-colors"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 group-hover:bg-brand-600 transition-colors">
                            <Zap className="h-6 w-6 text-brand-600 group-hover:text-white transition-colors" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">
                            Getting Started
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Quick start guide to set up your account, connect integrations, and view your first metrics.
                        </p>
                        <p className="mt-4 text-sm font-medium text-brand-600">
                            Read guide →
                        </p>
                    </Link>

                    {/* Integrations */}
                    <div className="rounded-lg border border-slate-200 p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                            <Settings className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">
                            Integrations
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 mb-4">
                            Learn how to connect and sync your data sources.
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/docs/integrations/stripe" className="text-sm text-brand-600 hover:text-brand-700">
                                    → Stripe Integration
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/integrations/hubspot" className="text-sm text-brand-600 hover:text-brand-700">
                                    → HubSpot Integration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* FAQ */}
                    <Link
                        href="/faq"
                        className="group relative rounded-lg border border-slate-200 p-8 hover:border-brand-600 transition-colors"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-brand-600 transition-colors">
                            <HelpCircle className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">
                            FAQ
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Answers to common questions about this project, features, and technical implementation.
                        </p>
                        <p className="mt-4 text-sm font-medium text-brand-600">
                            View FAQ →
                        </p>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-slate-900">Quick Links</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/contact" className="text-sm text-slate-600 hover:text-brand-600">
                            → Contact Support
                        </Link>
                        <Link href="/terms" className="text-sm text-slate-600 hover:text-brand-600">
                            → Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-sm text-slate-600 hover:text-brand-600">
                            → Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
