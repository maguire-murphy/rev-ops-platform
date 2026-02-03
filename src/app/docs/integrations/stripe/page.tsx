import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Stripe Integration Guide",
    description: "Learn how to connect your Stripe account for automatic MRR tracking, customer analytics, and revenue insights.",
    path: "/docs/integrations/stripe",
});

export default function StripeIntegrationPage() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/docs" className="text-sm text-yellow-primary hover:text-yellow-soft">
                        ← Back to Documentation
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Stripe Integration
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                    Connect Stripe to automatically track MRR, ARR, churn, and customer metrics.
                </p>

                <div className="prose prose-invert prose-lg mt-12 max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed prose-h2:mt-12 prose-h2:mb-6 prose-h3:mt-8 prose-h3:mb-4">
                    <h2>Overview</h2>
                    <p>
                        The Stripe integration is the core of the platform's revenue analytics. It automatically syncs your subscription data, customer information, and payment history to provide real-time insights into your SaaS metrics.
                    </p>

                    <h2>Connecting Stripe</h2>
                    <ol>
                        <li>In your the platform dashboard, navigate to Settings → Integrations</li>
                        <li>Click "Connect Stripe"</li>
                        <li>You'll be redirected to Stripe's secure authorization page</li>
                        <li>Select the Stripe account you want to connect</li>
                        <li>Click "Connect" to authorize the platform</li>
                        <li>You'll be redirected back to the platform, where the initial data sync will begin</li>
                    </ol>

                    <h2>What Data is Synced?</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Data Type</th>
                                <th>Used For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Customers</td>
                                <td>Customer list, segmentation, health scores</td>
                            </tr>
                            <tr>
                                <td>Subscriptions</td>
                                <td>MRR/ARR calculations, churn tracking</td>
                            </tr>
                            <tr>
                                <td>Invoices</td>
                                <td>Revenue recognition, payment history</td>
                            </tr>
                            <tr>
                                <td>Products & Prices</td>
                                <td>Plan analysis, pricing trends</td>
                            </tr>
                            <tr>
                                <td>Payment Methods</td>
                                <td>Metadata only (type, last 4 digits)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Data Privacy & Security</h2>
                    <p>
                        the platform uses Stripe's OAuth 2.0 protocol for secure authentication. We follow these security practices:
                    </p>
                    <ul>
                        <li>We never access or store full credit card numbers</li>
                        <li>All data is encrypted in transit and at rest</li>
                        <li>We only request the minimum permissions needed</li>
                        <li>You can disconnect Stripe at any time from Settings</li>
                    </ul>

                    <h2>Initial Sync</h2>
                    <p>
                        When you first connect Stripe, the platform will sync:
                    </p>
                    <ul>
                        <li>All active and canceled subscriptions</li>
                        <li>Customer data for the last 12 months</li>
                        <li>Invoice history for active customers</li>
                    </ul>
                    <p>
                        Initial sync typically takes 1-5 minutes depending on your data volume. You can use the platform while the sync completes.
                    </p>

                    <h2>Ongoing Syncing</h2>
                    <p>
                        After the initial sync, the platform stays up-to-date in two ways:
                    </p>
                    <h3>1. Webhooks (Real-time)</h3>
                    <p>
                        the platform automatically sets up Stripe webhooks for instant updates when:
                    </p>
                    <ul>
                        <li>A customer subscribes or cancels</li>
                        <li>An invoice is paid or fails</li>
                        <li>A subscription changes plan</li>
                        <li>Customer information is updated</li>
                    </ul>

                    <h3>2. Daily Background Sync</h3>
                    <p>
                        Every 24 hours, the platform performs a full sync to ensure data accuracy and catch any events that may have been missed.
                    </p>

                    <h2>Troubleshooting</h2>

                    <h3>Metrics Not Updating</h3>
                    <p>If your metrics aren't updating:</p>
                    <ol>
                        <li>Check Settings → Integrations to ensure Stripe is still connected</li>
                        <li>Verify your Stripe account has active subscriptions</li>
                        <li>Try disconnecting and reconnecting Stripe</li>
                        <li>Contact support if issues persist</li>
                    </ol>

                    <h3>Missing Customers</h3>
                    <p>
                        the platform only syncs customers who have (or had) active subscriptions. One-time payment customers won't appear in your metrics.
                    </p>

                    <h3>Disconnecting Stripe</h3>
                    <p>
                        To disconnect Stripe:
                    </p>
                    <ol>
                        <li>Go to Settings → Integrations</li>
                        <li>Click "Disconnect" next to Stripe</li>
                        <li>Confirm disconnection</li>
                    </ol>
                    <p>
                        <strong>Note:</strong> Your historical data in the platform will be preserved, but new updates won't be synced until you reconnect.
                    </p>

                    <h2>Need Help?</h2>
                    <p>
                        If you encounter issues connecting Stripe:
                    </p>
                    <ul>
                        <li>Check Stripe's <a href="https://stripe.com/docs/connect" target="_blank" rel="noopener noreferrer">OAuth documentation<ExternalLink className="inline h-3 w-3 ml-1" /></a></li>
                        <li>Visit our <Link href="/faq">FAQ page</Link></li>
                        <li>Email <a href="mailto:maguire.murphy@live.com">maguire.murphy@live.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
