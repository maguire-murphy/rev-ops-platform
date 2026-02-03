import Link from "next/link";
import { CheckCircle2, Link2, BarChart3, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Getting Started",
    description: "Step-by-step guide to set up the platform, connect Stripe and HubSpot, and start tracking your SaaS revenue metrics.",
    path: "/docs/getting-started",
});

export default function GettingStartedPage() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/docs" className="text-sm text-yellow-primary hover:text-yellow-soft">
                        ← Back to Documentation
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Getting Started
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                    Follow this guide to set up your account and start tracking your SaaS revenue metrics in minutes.
                </p>

                <div className="prose prose-invert prose-lg mt-12 max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed">
                    <section className="mb-16">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-primary text-lg font-bold">
                                1
                            </span>
                            Create Your Account
                        </h2>
                        <p>
                            Start by creating an account. You can sign up with your email or use Google authentication for faster setup.
                        </p>
                        <ol>
                            <li>Visit the <Link href="/signup">signup page</Link></li>
                            <li>Enter your email and create a password, or click "Continue with Google"</li>
                            <li>Verify your email address (check your inbox for a confirmation email)</li>
                            <li>Complete your profile with your company information</li>
                        </ol>
                        <div className="not-prose flex items-start gap-3 rounded-lg bg-navy-rich border border-white/10 p-4 my-6">
                            <CheckCircle2 className="h-5 w-5 text-yellow-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    No credit card required
                                </p>
                                <p className="text-sm text-slate-300">
                                    Start with our free tier and upgrade when you're ready.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-primary text-lg font-bold">
                                2
                            </span>
                            Connect Stripe
                        </h2>
                        <p>
                            Stripe integration is the foundation of your revenue analytics. The platform syncs your subscription data, customer information, and MRR metrics.
                        </p>
                        <ol>
                            <li>From your dashboard, click "Connect Stripe" in the onboarding wizard</li>
                            <li>You'll be redirected to Stripe's secure OAuth flow</li>
                            <li>Select the Stripe account you want to connect</li>
                            <li>Authorize the platform to access your subscription and customer data</li>
                            <li>You'll be redirected back, where the initial sync will begin</li>
                        </ol>
                        <div className="not-prose my-6">
                            <Link
                                href="/docs/integrations/stripe"
                                className="flex items-center gap-2 text-yellow-primary hover:text-yellow-soft"
                            >
                                <ArrowRight className="h-4 w-4" />
                                <span className="text-sm font-medium">Detailed Stripe integration guide</span>
                            </Link>
                        </div>
                        <h3>What data does the platform access?</h3>
                        <ul>
                            <li>Customer information (names, emails, IDs)</li>
                            <li>Subscription data (plans, status, pricing)</li>
                            <li>Invoice and payment history</li>
                            <li>Product and price information</li>
                        </ul>
                        <p>
                            <strong>Note:</strong> The platform does not access or store credit card numbers or sensitive payment methods.
                        </p>
                    </section>

                    <section className="mb-16">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-primary text-lg font-bold">
                                3
                            </span>
                            Connect HubSpot (Optional)
                        </h2>
                        <p>
                            Connect HubSpot to see how your sales pipeline correlates with revenue metrics and track deal progression.
                        </p>
                        <ol>
                            <li>Click "Connect HubSpot" from the onboarding wizard</li>
                            <li>Sign in to your HubSpot account</li>
                            <li>Grant permission to access contacts and deals</li>
                            <li>Map your HubSpot properties to platform fields (if needed)</li>
                        </ol>
                        <div className="not-prose my-6">
                            <Link
                                href="/docs/integrations/hubspot"
                                className="flex items-center gap-2 text-yellow-primary hover:text-yellow-soft"
                            >
                                <ArrowRight className="h-4 w-4" />
                                <span className="text-sm font-medium">Detailed HubSpot integration guide</span>
                            </Link>
                        </div>
                    </section>

                    <section className="mb-16">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-primary text-lg font-bold">
                                4
                            </span>
                            Explore Your Dashboard
                        </h2>
                        <p>
                            Once your integrations are connected, you'll see your metrics populate in real-time. Here's what you'll find:
                        </p>
                        <h3>Key Metrics</h3>
                        <ul>
                            <li><strong>MRR (Monthly Recurring Revenue):</strong> Your current monthly recurring revenue</li>
                            <li><strong>ARR (Annual Recurring Revenue):</strong> Annualized revenue</li>
                            <li><strong>Churn Rate:</strong> Customer and revenue churn metrics</li>
                            <li><strong>Customer Count:</strong> Active, new, and churned customers</li>
                        </ul>
                        <h3>Main Navigation</h3>
                        <ul>
                            <li><strong>Dashboard:</strong> Overview of key metrics and trends</li>
                            <li><strong>Customers:</strong> Detailed customer list and individual analysis</li>
                            <li><strong>Metrics:</strong> Deep dives into MRR, churn, and retention</li>
                            <li><strong>Pipeline:</strong> HubSpot deal tracking and forecasting</li>
                            <li><strong>Forecast:</strong> Revenue predictions and projections</li>
                            <li><strong>Settings:</strong> Manage integrations, team, and preferences</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-primary text-lg font-bold">
                                5
                            </span>
                            Next Steps
                        </h2>
                        <p>You're all set! Here are some recommended next steps:</p>
                        <div className="not-prose space-y-4 my-6">
                            <Link
                                href="/dashboard"
                                className="block rounded-lg border border-white/10 p-6 hover:border-yellow-primary transition-colors bg-navy-rich"
                            >
                                <h3 className="font-semibold text-white">Visit your dashboard</h3>
                                <p className="text-sm text-slate-300 mt-1">Start exploring your revenue metrics</p>
                            </Link>
                            <Link
                                href="/customers"
                                className="block rounded-lg border border-white/10 p-6 hover:border-yellow-primary transition-colors bg-navy-rich"
                            >
                                <h3 className="font-semibold text-white">Review customer health</h3>
                                <p className="text-sm text-slate-300 mt-1">See which customers are thriving or at risk</p>
                            </Link>
                            <Link
                                href="/faq"
                                className="block rounded-lg border border-white/10 p-6 hover:border-yellow-primary transition-colors bg-navy-rich"
                            >
                                <h3 className="font-semibold text-white">Browse FAQ</h3>
                                <p className="text-sm text-slate-300 mt-1">Find answers to common questions</p>
                            </Link>
                        </div>
                    </section>

                    <section>
                        <h2>Need Help?</h2>
                        <p>
                            If you run into any issues or have questions:
                        </p>
                        <ul>
                            <li>Check our <Link href="/faq">FAQ page</Link> for quick answers</li>
                            <li>Browse the <Link href="/docs">full documentation</Link></li>
                            <li>Email <a href="mailto:maguire.murphy@live.com">maguire.murphy@live.com</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
