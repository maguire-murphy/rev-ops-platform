import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import {
    StepBadge,
    InfoBox,
    SectionDivider,
} from "@/components/docs/doc-components";

export const metadata: Metadata = generateMetadata({
    title: "Getting Started",
    description: "Step-by-step guide to set up the platform, connect Stripe and HubSpot, and start tracking your SaaS revenue metrics.",
    path: "/docs/getting-started",
});

export default function GettingStartedPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/docs" className="text-sm text-navy-rich hover:text-yellow-primary transition-colors font-medium">
                        ← Back to Documentation
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-navy-deep sm:text-5xl">
                    Getting Started
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                    Follow this guide to set up your account and start tracking your SaaS revenue metrics in minutes.
                </p>

                <div className="mt-12">
                    {/* Step 1: Create Account */}
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <StepBadge number={1} />
                            <h2 className="text-2xl font-bold text-navy-deep">Create Your Account</h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Start by creating an account. You can sign up with your email or use Google authentication for faster setup.
                        </p>
                        <ol className="space-y-3 mb-6 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">Visit the <Link href="/signup" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2">signup page</Link></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">Enter your email and create a password, or click "Continue with Google"</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Verify your email address (check your inbox for a confirmation email)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">4</span>
                                <span className="text-slate-700">Complete your profile with your company information</span>
                            </li>
                        </ol>
                        <InfoBox title="No credit card required" variant="success">
                            <p>Start with our free tier and upgrade when you're ready. Full access to all features during your trial.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Step 2: Connect Stripe */}
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <StepBadge number={2} />
                            <h2 className="text-2xl font-bold text-navy-deep">Connect Stripe</h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Stripe integration is the foundation of your revenue analytics. The platform syncs your subscription data, customer information, and MRR metrics.
                        </p>
                        <ol className="space-y-3 mb-6 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">From your dashboard, click "Connect Stripe" in the onboarding wizard</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">You'll be redirected to Stripe's secure OAuth flow</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Select the Stripe account you want to connect</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">4</span>
                                <span className="text-slate-700">Authorize Beacon to access your subscription and customer data</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">5</span>
                                <span className="text-slate-700">You'll be redirected back, where the initial sync will begin</span>
                            </li>
                        </ol>
                        <div className="mb-6">
                            <Link
                                href="/docs/integrations/stripe"
                                className="inline-flex items-center gap-2 text-navy-rich hover:text-yellow-primary font-medium transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                                <span>Detailed Stripe integration guide</span>
                            </Link>
                        </div>
                        <h3 className="text-lg font-bold text-navy-deep mb-3">What data does Beacon access?</h3>
                        <ul className="space-y-2 mb-4 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Customer information (names, emails, IDs)</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Subscription data (plans, status, pricing)</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Invoice and payment history</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Product and price information</span>
                            </li>
                        </ul>
                        <InfoBox title="Privacy Note" variant="security">
                            <p>Beacon does not access or store credit card numbers or sensitive payment methods. We only read the data needed for analytics.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Step 3: Connect HubSpot */}
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <StepBadge number={3} />
                            <h2 className="text-2xl font-bold text-navy-deep">Connect HubSpot <span className="text-slate-400 font-normal text-lg">(Optional)</span></h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Connect HubSpot to see how your sales pipeline correlates with revenue metrics and track deal progression.
                        </p>
                        <ol className="space-y-3 mb-6 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">Click "Connect HubSpot" from the onboarding wizard</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">Sign in to your HubSpot account</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Grant permission to access contacts and deals</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">4</span>
                                <span className="text-slate-700">Map your HubSpot properties to Beacon fields (if needed)</span>
                            </li>
                        </ol>
                        <div className="mb-6">
                            <Link
                                href="/docs/integrations/hubspot"
                                className="inline-flex items-center gap-2 text-navy-rich hover:text-yellow-primary font-medium transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                                <span>Detailed HubSpot integration guide</span>
                            </Link>
                        </div>
                    </section>

                    <SectionDivider />

                    {/* Step 4: Explore Dashboard */}
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <StepBadge number={4} />
                            <h2 className="text-2xl font-bold text-navy-deep">Explore Your Dashboard</h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            Once your integrations are connected, you'll see your metrics populate in real-time. Here's what you'll find:
                        </p>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Key Metrics</h3>
                        <ul className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">MRR (Monthly Recurring Revenue):</strong> Your current monthly recurring revenue</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">ARR (Annual Recurring Revenue):</strong> Annualized revenue</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Churn Rate:</strong> Customer and revenue churn metrics</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Customer Count:</strong> Active, new, and churned customers</span>
                            </li>
                        </ul>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Main Navigation</h3>
                        <ul className="space-y-2 mb-4 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Dashboard:</strong> Overview of key metrics and trends</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Customers:</strong> Detailed customer list and individual analysis</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Metrics:</strong> Deep dives into MRR, churn, and retention</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Pipeline:</strong> HubSpot deal tracking and forecasting</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Forecast:</strong> Revenue predictions and projections</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span><strong className="text-navy-deep">Settings:</strong> Manage integrations, team, and preferences</span>
                            </li>
                        </ul>
                    </section>

                    <SectionDivider />

                    {/* Step 5: Next Steps */}
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <StepBadge number={5} />
                            <h2 className="text-2xl font-bold text-navy-deep">Next Steps</h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-6">You're all set! Here are some recommended next steps:</p>
                        <div className="grid gap-4">
                            <Link
                                href="/dashboard"
                                className="block rounded-lg border border-slate-200 p-6 hover:border-yellow-primary hover:shadow-md transition-all bg-white group"
                            >
                                <h3 className="font-bold text-navy-deep group-hover:text-yellow-primary transition-colors">Visit your dashboard</h3>
                                <p className="text-sm text-slate-600 mt-1">Start exploring your revenue metrics</p>
                            </Link>
                            <Link
                                href="/customers"
                                className="block rounded-lg border border-slate-200 p-6 hover:border-yellow-primary hover:shadow-md transition-all bg-white group"
                            >
                                <h3 className="font-bold text-navy-deep group-hover:text-yellow-primary transition-colors">Review customer health</h3>
                                <p className="text-sm text-slate-600 mt-1">See which customers are thriving or at risk</p>
                            </Link>
                            <Link
                                href="/faq"
                                className="block rounded-lg border border-slate-200 p-6 hover:border-yellow-primary hover:shadow-md transition-all bg-white group"
                            >
                                <h3 className="font-bold text-navy-deep group-hover:text-yellow-primary transition-colors">Browse FAQ</h3>
                                <p className="text-sm text-slate-600 mt-1">Find answers to common questions</p>
                            </Link>
                        </div>
                    </section>

                    <SectionDivider />

                    {/* Need Help */}
                    <section>
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Need Help?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            If you run into any issues or have questions:
                        </p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Check our <Link href="/faq" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2">FAQ page</Link> for quick answers</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Browse the <Link href="/docs" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2">full documentation</Link></span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Email <a href="mailto:maguire.murphy@live.com" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2">maguire.murphy@live.com</a></span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
