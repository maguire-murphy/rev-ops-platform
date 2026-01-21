import Link from "next/link";
import { Home, Search, BookOpen, Mail } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. Return to the homepage or explore the documentation.",
    path: "/404",
});

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">
            <div className="text-center">
                <p className="text-base font-semibold text-brand-600">404</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-6 text-lg leading-7 text-slate-600">
                    Sorry, we couldn't find the page you're looking for.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-all hover:scale-105"
                    >
                        <Home className="h-4 w-4" />
                        Go to Homepage
                    </Link>
                    <Link
                        href="/docs"
                        className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                    >
                        <BookOpen className="h-4 w-4" />
                        Browse Documentation
                    </Link>
                </div>

                <div className="mt-12 border-t border-slate-200 pt-8">
                    <h2 className="text-sm font-semibold text-slate-900">
                        Popular pages
                    </h2>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link href="/docs/getting-started" className="text-sm text-brand-600 hover:text-brand-700">
                                Getting Started Guide
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/integrations/stripe" className="text-sm text-brand-600 hover:text-brand-700">
                                Stripe Integration
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/integrations/hubspot" className="text-sm text-brand-600 hover:text-brand-700">
                                HubSpot Integration
                            </Link>
                        </li>
                        <li>
                            <Link href="/faq" className="text-sm text-brand-600 hover:text-brand-700">
                                Frequently Asked Questions
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-sm text-brand-600 hover:text-brand-700">
                                Contact Support
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-slate-500">
                        Still can't find what you're looking for?{" "}
                        <Link href="/contact" className="font-medium text-brand-600 hover:text-brand-700">
                            Contact our support team
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
