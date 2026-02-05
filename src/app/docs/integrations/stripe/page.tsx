import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import {
    StepBadge,
    InfoBox,
    DocTable,
    SectionDivider,
} from "@/components/docs/doc-components";

export const metadata: Metadata = generateMetadata({
    title: "Stripe Integration Guide",
    description: "Learn how to connect your Stripe account for automatic MRR tracking, customer analytics, and revenue insights.",
    path: "/docs/integrations/stripe",
});

export default function StripeIntegrationPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/docs" className="text-sm text-navy-rich hover:text-yellow-primary transition-colors font-medium">
                        ← Back to Documentation
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-navy-deep sm:text-5xl">
                    Stripe Integration
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                    Connect Stripe to automatically track MRR, ARR, churn, and customer metrics.
                </p>

                <div className="mt-12">
                    {/* Overview */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Overview</h2>
                        <p className="text-slate-700 leading-relaxed">
                            The Stripe integration is the core of Beacon's revenue analytics. It automatically syncs your subscription data, customer information, and payment history to provide real-time insights into your SaaS metrics.
                        </p>
                    </section>

                    <SectionDivider />

                    {/* Connecting Stripe */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">Connecting Stripe</h2>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            Follow these steps to connect your Stripe account:
                        </p>
                        <ol className="space-y-4 mb-6">
                            <li className="flex items-start gap-4">
                                <StepBadge number={1} size="sm" />
                                <span className="text-slate-700 pt-1">In your Beacon dashboard, navigate to <strong className="text-navy-deep">Settings → Integrations</strong></span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={2} size="sm" />
                                <span className="text-slate-700 pt-1">Click <strong className="text-navy-deep">"Connect Stripe"</strong></span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={3} size="sm" />
                                <span className="text-slate-700 pt-1">You'll be redirected to Stripe's secure authorization page</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={4} size="sm" />
                                <span className="text-slate-700 pt-1">Select the Stripe account you want to connect</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={5} size="sm" />
                                <span className="text-slate-700 pt-1">Click <strong className="text-navy-deep">"Connect"</strong> to authorize Beacon</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={6} size="sm" />
                                <span className="text-slate-700 pt-1">You'll be redirected back to Beacon, where the initial data sync will begin</span>
                            </li>
                        </ol>
                    </section>

                    <SectionDivider />

                    {/* What Data is Synced */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">What Data is Synced?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Beacon syncs the following data from your Stripe account:
                        </p>
                        <DocTable
                            headers={["Data Type", "Used For"]}
                            rows={[
                                ["Customers", "Customer list, segmentation, health scores"],
                                ["Subscriptions", "MRR/ARR calculations, churn tracking"],
                                ["Invoices", "Revenue recognition, payment history"],
                                ["Products & Prices", "Plan analysis, pricing trends"],
                                ["Payment Methods", "Metadata only (type, last 4 digits)"],
                            ]}
                        />
                    </section>

                    <SectionDivider />

                    {/* Data Privacy & Security */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">Data Privacy & Security</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Beacon uses Stripe's OAuth 2.0 protocol for secure authentication. We follow these security practices:
                        </p>
                        <InfoBox title="Security Practices" variant="security">
                            <ul className="space-y-2 mt-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-navy-rich mt-0.5">✓</span>
                                    <span>We never access or store full credit card numbers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-navy-rich mt-0.5">✓</span>
                                    <span>All data is encrypted in transit and at rest</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-navy-rich mt-0.5">✓</span>
                                    <span>We only request the minimum permissions needed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-navy-rich mt-0.5">✓</span>
                                    <span>You can disconnect Stripe at any time from Settings</span>
                                </li>
                            </ul>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Initial Sync */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Initial Sync</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            When you first connect Stripe, Beacon will sync:
                        </p>
                        <ul className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>All active and canceled subscriptions</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Customer data for the last 12 months</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Invoice history for active customers</span>
                            </li>
                        </ul>
                        <InfoBox title="Sync Time" variant="info">
                            <p>Initial sync typically takes 1-5 minutes depending on your data volume. You can use Beacon while the sync completes.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Ongoing Sync */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Ongoing Syncing</h2>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            After the initial sync, Beacon stays up-to-date in two ways:
                        </p>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">1. Webhooks (Real-time)</h3>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Beacon automatically sets up Stripe webhooks for instant updates when:
                        </p>
                        <ul className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>A customer subscribes or cancels</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>An invoice is paid or fails</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>A subscription changes plan</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Customer information is updated</span>
                            </li>
                        </ul>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">2. Daily Background Sync</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Every 24 hours, Beacon performs a full sync to ensure data accuracy and catch any events that may have been missed.
                        </p>
                    </section>

                    <SectionDivider />

                    {/* Troubleshooting */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">Troubleshooting</h2>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Metrics Not Updating</h3>
                        <p className="text-slate-700 leading-relaxed mb-3">If your metrics aren't updating:</p>
                        <ol className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">Check Settings → Integrations to ensure Stripe is still connected</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">Verify your Stripe account has active subscriptions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Try disconnecting and reconnecting Stripe</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">4</span>
                                <span className="text-slate-700">Contact support if issues persist</span>
                            </li>
                        </ol>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Missing Customers</h3>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            Beacon only syncs customers who have (or had) active subscriptions. One-time payment customers won't appear in your metrics.
                        </p>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Disconnecting Stripe</h3>
                        <p className="text-slate-700 leading-relaxed mb-3">To disconnect Stripe:</p>
                        <ol className="space-y-2 mb-4 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">Go to Settings → Integrations</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">Click "Disconnect" next to Stripe</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Confirm disconnection</span>
                            </li>
                        </ol>
                        <InfoBox title="Note" variant="info">
                            <p>Your historical data in Beacon will be preserved, but new updates won't be synced until you reconnect.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Need Help */}
                    <section>
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Need Help?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            If you encounter issues connecting Stripe:
                        </p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Check Stripe's <a href="https://stripe.com/docs/connect" target="_blank" rel="noopener noreferrer" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2 inline-flex items-center gap-1">OAuth documentation <ExternalLink className="h-3 w-3" /></a></span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Visit our <Link href="/faq" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2">FAQ page</Link></span>
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
