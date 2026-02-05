import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import {
    StepBadge,
    InfoBox,
    DocTable,
    SectionDivider,
} from "@/components/docs/doc-components";

export const metadata: Metadata = generateMetadata({
    title: "HubSpot Integration Guide",
    description: "Connect HubSpot to correlate sales pipeline data with revenue metrics and track deal progression.",
    path: "/docs/integrations/hubspot",
});

export default function HubSpotIntegrationPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/docs" className="text-sm text-navy-rich hover:text-yellow-primary transition-colors font-medium">
                        ← Back to Documentation
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-navy-deep sm:text-5xl">
                    HubSpot Integration
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                    Connect HubSpot to see how your sales pipeline correlates with revenue metrics.
                </p>

                <div className="mt-12">
                    {/* Overview */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Overview</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            The HubSpot integration brings CRM data into Beacon, allowing you to:
                        </p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Track deal progression and close rates</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Correlate pipeline activity with revenue</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Identify which marketing sources drive revenue</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Forecast future revenue based on deal stage</span>
                            </li>
                        </ul>
                    </section>

                    <SectionDivider />

                    {/* Connecting HubSpot */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">Connecting HubSpot</h2>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            Follow these steps to connect your HubSpot account:
                        </p>
                        <ol className="space-y-4 mb-6">
                            <li className="flex items-start gap-4">
                                <StepBadge number={1} size="sm" />
                                <span className="text-slate-700 pt-1">Navigate to <strong className="text-navy-deep">Settings → Integrations</strong> in Beacon</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={2} size="sm" />
                                <span className="text-slate-700 pt-1">Click <strong className="text-navy-deep">"Connect HubSpot"</strong></span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={3} size="sm" />
                                <span className="text-slate-700 pt-1">Sign in to your HubSpot account (if not already signed in)</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={4} size="sm" />
                                <span className="text-slate-700 pt-1">Review the permissions Beacon is requesting</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={5} size="sm" />
                                <span className="text-slate-700 pt-1">Click <strong className="text-navy-deep">"Grant access"</strong> to authorize Beacon</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <StepBadge number={6} size="sm" />
                                <span className="text-slate-700 pt-1">You'll be redirected back to Beacon</span>
                            </li>
                        </ol>
                    </section>

                    <SectionDivider />

                    {/* What Data is Synced */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">What Data is Synced?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Beacon syncs the following data from your HubSpot account:
                        </p>
                        <DocTable
                            headers={["Data Type", "Used For"]}
                            rows={[
                                ["Contacts", "Linking customers to CRM records"],
                                ["Companies", "Account-level tracking and segmentation"],
                                ["Deals", "Pipeline analysis and forecasting"],
                                ["Deal Stages", "Conversion tracking and win rates"],
                            ]}
                        />
                    </section>

                    <SectionDivider />

                    {/* Matching Customers */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Matching Customers</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Beacon automatically matches HubSpot contacts with Stripe customers using:
                        </p>
                        <ol className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700"><strong className="text-navy-deep">Email address</strong> (primary matching method)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700"><strong className="text-navy-deep">Company name</strong> (for business accounts)</span>
                            </li>
                        </ol>
                        <InfoBox title="Customer Matching" variant="tip">
                            <p>When a match is found, you'll see HubSpot deal information on the customer detail page in Beacon.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Pipeline Intelligence */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Pipeline Intelligence</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Once connected, you can:
                        </p>
                        <ul className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>View total pipeline value and deal count</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>See average deal size and close rate</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Track time to close by deal stage</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Identify which lead sources convert to revenue</span>
                            </li>
                        </ul>
                        <InfoBox title="Access Pipeline Insights" variant="info">
                            <p>Access these insights from the <strong>"Pipeline"</strong> section in your Beacon dashboard.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Ongoing Sync */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Ongoing Sync</h2>
                        <p className="text-slate-700 leading-relaxed">
                            HubSpot data syncs every 6 hours to keep pipeline metrics current. Manual refresh is also available from Settings → Integrations.
                        </p>
                    </section>

                    <SectionDivider />

                    {/* Troubleshooting */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-navy-deep mb-6">Troubleshooting</h2>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">No Deals Appearing</h3>
                        <p className="text-slate-700 leading-relaxed mb-3">If you don't see deal data:</p>
                        <ol className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">Verify you have deals in your HubSpot account</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">Check that your HubSpot account has a sales pipeline configured</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Ensure Beacon has permission to access deals (check Settings → Integrations)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">4</span>
                                <span className="text-slate-700">Wait up to 6 hours for initial sync to complete</span>
                            </li>
                        </ol>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Customers Not Matching</h3>
                        <p className="text-slate-700 leading-relaxed mb-3">
                            If HubSpot contacts aren't matching with Stripe customers:
                        </p>
                        <ul className="space-y-2 mb-6 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Ensure email addresses match exactly between Stripe and HubSpot</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Check for typos or different email addresses</span>
                            </li>
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Company name matching is case-insensitive but spelling must match</span>
                            </li>
                        </ul>

                        <h3 className="text-lg font-bold text-navy-deep mb-3">Disconnecting HubSpot</h3>
                        <p className="text-slate-700 leading-relaxed mb-3">To disconnect HubSpot:</p>
                        <ol className="space-y-2 mb-4 ml-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">1</span>
                                <span className="text-slate-700">Go to Settings → Integrations</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">2</span>
                                <span className="text-slate-700">Click "Disconnect" next to HubSpot</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-primary/20 text-yellow-700 font-semibold text-sm flex items-center justify-center mt-0.5">3</span>
                                <span className="text-slate-700">Confirm disconnection</span>
                            </li>
                        </ol>
                        <InfoBox title="Note" variant="info">
                            <p>Historical pipeline data will be preserved, but new deals won't sync until you reconnect.</p>
                        </InfoBox>
                    </section>

                    <SectionDivider />

                    {/* Need Help */}
                    <section>
                        <h2 className="text-2xl font-bold text-navy-deep mb-4">Need Help?</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            For HubSpot integration issues:
                        </p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2 text-slate-700">
                                <span className="text-yellow-primary mt-1">•</span>
                                <span>Check HubSpot's <a href="https://developers.hubspot.com/" target="_blank" rel="noopener noreferrer" className="text-navy-rich font-medium hover:text-yellow-primary underline underline-offset-2 inline-flex items-center gap-1">developer documentation <ExternalLink className="h-3 w-3" /></a></span>
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
