import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "HubSpot Integration Guide",
    description: "Connect HubSpot to correlate sales pipeline data with revenue metrics and track deal progression.",
    path: "/docs/integrations/hubspot",
});

export default function HubSpotIntegrationPage() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/docs" className="text-sm text-yellow-primary hover:text-yellow-soft">
                        ← Back to Documentation
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    HubSpot Integration
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                    Connect HubSpot to see how your sales pipeline correlates with revenue metrics.
                </p>

                <div className="prose prose-invert prose-lg mt-12 max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed prose-h2:mt-12 prose-h2:mb-6 prose-h3:mt-8 prose-h3:mb-4">
                    <h2>Overview</h2>
                    <p>
                        The HubSpot integration brings CRM data into the platform, allowing you to:
                    </p>
                    <ul>
                        <li>Track deal progression and close rates</li>
                        <li>Correlate pipeline activity with revenue</li>
                        <li>Identify which marketing sources drive revenue</li>
                        <li>Forecast future revenue based on deal stage</li>
                    </ul>

                    <h2>Connecting HubSpot</h2>
                    <ol>
                        <li>Navigate to Settings → Integrations in the platform</li>
                        <li>Click "Connect HubSpot"</li>
                        <li>Sign in to your HubSpot account (if not already signed in)</li>
                        <li>Review the permissions the platform is requesting</li>
                        <li>Click "Grant access" to authorize the platform</li>
                        <li>You'll be redirected back to the platform</li>
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
                                <td>Contacts</td>
                                <td>Linking customers to CRM records</td>
                            </tr>
                            <tr>
                                <td>Companies</td>
                                <td>Account-level tracking and segmentation</td>
                            </tr>
                            <tr>
                                <td>Deals</td>
                                <td>Pipeline analysis and forecasting</td>
                            </tr>
                            <tr>
                                <td>Deal Stages</td>
                                <td>Conversion tracking and win rates</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Matching Customers</h2>
                    <p>
                        the platform automatically matches HubSpot contacts with Stripe customers using:
                    </p>
                    <ol>
                        <li>Email address (primary matching method)</li>
                        <li>Company name (for business accounts)</li>
                    </ol>
                    <p>
                        When a match is found, you'll see HubSpot deal information on the customer detail page in the platform.
                    </p>

                    <h2>Pipeline Intelligence</h2>
                    <p>
                        Once connected, you can:
                    </p>
                    <ul>
                        <li>View total pipeline value and deal count</li>
                        <li>See average deal size and close rate</li>
                        <li>Track time to close by deal stage</li>
                        <li>Identify which lead sources convert to revenue</li>
                    </ul>
                    <p>
                        Access these insights from the "Pipeline" section in your the platform dashboard.
                    </p>

                    <h2>Ongoing Sync</h2>
                    <p>
                        HubSpot data syncs every 6 hours to keep pipeline metrics current. Manual refresh is also available from Settings → Integrations.
                    </p>

                    <h2>Troubleshooting</h2>

                    <h3>No Deals Appearing</h3>
                    <p>If you don't see deal data:</p>
                    <ol>
                        <li>Verify you have deals in your HubSpot account</li>
                        <li>Check that your HubSpot account has a sales pipeline configured</li>
                        <li>Ensure the platform has permission to access deals (check Settings → Integrations)</li>
                        <li>Wait up to 6 hours for initial sync to complete</li>
                    </ol>

                    <h3>Customers Not Matching</h3>
                    <p>
                        If HubSpot contacts aren't matching with Stripe customers:
                    </p>
                    <ul>
                        <li>Ensure email addresses match exactly between Stripe and HubSpot</li>
                        <li>Check for typos or different email addresses</li>
                        <li>Company name matching is case-insensitive but spelling must match</li>
                    </ul>

                    <h3>Disconnecting HubSpot</h3>
                    <p>
                        To disconnect HubSpot:
                    </p>
                    <ol>
                        <li>Go to Settings → Integrations</li>
                        <li>Click "Disconnect" next to HubSpot</li>
                        <li>Confirm disconnection</li>
                    </ol>
                    <p>
                        Historical pipeline data will be preserved, but new deals won't sync until you reconnect.
                    </p>

                    <h2>Need Help?</h2>
                    <p>
                        For HubSpot integration issues:
                    </p>
                    <ul>
                        <li>Check HubSpot's <a href="https://developers.hubspot.com/" target="_blank" rel="noopener noreferrer">developer documentation<ExternalLink className="inline h-3 w-3 ml-1" /></a></li>
                        <li>Visit our <Link href="/faq">FAQ page</Link></li>
                        <li>Email <a href="mailto:maguire.murphy@live.com">maguire.murphy@live.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
