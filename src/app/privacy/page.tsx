import Link from "next/link";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Privacy Policy",
    description: "Privacy Policy for Beacon. Learn how we collect, use, protect, and manage your data.",
    path: "/privacy",
});

export default function PrivacyPage() {
    const lastUpdated = "January 14, 2026";

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-brand-600 hover:text-brand-700">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Last updated: {lastUpdated}
                </p>

                <div className="prose prose-slate mt-12 max-w-none">
                    <section>
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-6 not-prose mb-8">
                            <p className="text-amber-800 text-sm">
                                <strong>Note:</strong> This is a portfolio demonstration project. This privacy policy
                                describes how a production version of this platform would handle data.
                            </p>
                        </div>
                        <h2>Introduction</h2>
                        <p>
                            This Privacy Policy explains how Beacon ("we", "our", or "us") collects, uses, discloses, and safeguards information when you use the Service.
                        </p>
                        <p>
                            This policy applies to information collected through the website, application, and any related services (collectively, the "Service").
                        </p>
                    </section>

                    <section>
                        <h2>Information We Collect</h2>

                        <h3>1. Account Information</h3>
                        <p>When you create an account, we collect:</p>
                        <ul>
                            <li>Name and email address</li>
                            <li>Company name and size</li>
                            <li>Password (encrypted)</li>
                            <li>Profile information you choose to provide</li>
                        </ul>

                        <h3>2. Stripe Data</h3>
                        <p>When you connect your Stripe account, we collect:</p>
                        <ul>
                            <li>Customer data (names, emails, IDs)</li>
                            <li>Subscription information (plans, status, MRR)</li>
                            <li>Invoice and payment data</li>
                            <li>Product and pricing information</li>
                        </ul>
                        <p>
                            We only access data necessary to provide revenue analytics. We do not store credit card numbers or sensitive payment information.
                        </p>

                        <h3>3. HubSpot Data</h3>
                        <p>When you connect your HubSpot account, we collect:</p>
                        <ul>
                            <li>Contact information</li>
                            <li>Deal and pipeline data</li>
                            <li>Company information</li>
                            <li>Custom properties relevant to revenue tracking</li>
                        </ul>

                        <h3>4. Usage Data</h3>
                        <p>We automatically collect:</p>
                        <ul>
                            <li>Log data (IP address, browser type, device information)</li>
                            <li>Pages visited and features used</li>
                            <li>Time and date of visits</li>
                            <li>Referring websites</li>
                            <li>Performance and error data</li>
                        </ul>

                        <h3>5. Cookies and Tracking Technologies</h3>
                        <p>
                            We use cookies and similar technologies to track activity and improve our Service. See our{" "}
                            <Link href="/cookies" className="text-brand-600 hover:text-brand-700">Cookie Policy</Link>{" "}
                            for more information.
                        </p>
                    </section>

                    <section>
                        <h2>How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul>
                            <li>Provide, maintain, and improve the Service</li>
                            <li>Process and analyze revenue data to generate insights</li>
                            <li>Send you service updates, security alerts, and support messages</li>
                            <li>Respond to your requests and provide customer support</li>
                            <li>Monitor and analyze usage patterns and trends</li>
                            <li>Detect, prevent, and address technical issues and security threats</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                        <p>
                            We do not sell your personal information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2>Third-Party Services</h2>
                        <p>We use the following third-party services that may collect your information:</p>

                        <h3>Infrastructure & Hosting</h3>
                        <ul>
                            <li><strong>Vercel</strong> - Application hosting and deployment (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-600">Privacy Policy</a>)</li>
                            <li><strong>Neon</strong> - Database hosting (<a href="https://neon.tech/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600">Privacy Policy</a>)</li>
                        </ul>

                        <h3>Integrations</h3>
                        <ul>
                            <li><strong>Stripe</strong> - Payment and subscription data (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600">Privacy Policy</a>)</li>
                            <li><strong>HubSpot</strong> - CRM data (<a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-600">Privacy Policy</a>)</li>
                        </ul>

                        <h3>Analytics & Monitoring</h3>
                        <ul>
                            <li><strong>PostHog</strong> - Product analytics and session replay (<a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600">Privacy Policy</a>)</li>
                        </ul>

                        <h3>Communication</h3>
                        <ul>
                            <li><strong>Resend</strong> - Transactional emails (<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-600">Privacy Policy</a>)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction, including:
                        </p>
                        <ul>
                            <li>Encryption of data in transit (HTTPS/TLS)</li>
                            <li>Encryption of sensitive data at rest</li>
                            <li>Access controls and authentication</li>
                            <li>Regular security audits and monitoring</li>
                            <li>Secure development practices</li>
                        </ul>
                        <p>
                            However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2>Your Rights (GDPR & CCPA)</h2>
                        <p>
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>

                        <h3>Access and Portability</h3>
                        <p>
                            You have the right to request a copy of the personal data we hold about you and to receive it in a structured, commonly used format.
                        </p>

                        <h3>Rectification</h3>
                        <p>
                            You have the right to request correction of inaccurate or incomplete personal data.
                        </p>

                        <h3>Deletion ("Right to be Forgotten")</h3>
                        <p>
                            You have the right to request deletion of your personal data under certain circumstances.
                        </p>

                        <h3>Objection and Restriction</h3>
                        <p>
                            You have the right to object to or request restriction of certain data processing activities.
                        </p>

                        <h3>Withdraw Consent</h3>
                        <p>
                            Where we rely on your consent to process data, you may withdraw that consent at any time.
                        </p>

                        <h3>How to Exercise Your Rights</h3>
                        <p>
                            To exercise any of these rights, please contact us at{" "}
                            <a href="mailto:maguire.murphy@live.com" className="text-brand-600 hover:text-brand-700">
                                maguire.murphy@live.com
                            </a>
                            . We will respond to your request within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2>Data Retention</h2>
                        <p>
                            We retain your personal data only as long as necessary to provide the Service and fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
                        </p>
                        <p>
                            When you delete your account, we will delete or anonymize your personal data within 90 days, except where we are required to retain it for legal or regulatory purposes.
                        </p>
                    </section>

                    <section>
                        <h2>International Data Transfers</h2>
                        <p>
                            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable data protection laws.
                        </p>
                    </section>

                    <section>
                        <h2>Children's Privacy</h2>
                        <p>
                            Our Service is not intended for children under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2>Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new Policy on this page and updating the "Last updated" date.
                        </p>
                        <p>
                            Your continued use of the Service after changes are posted constitutes your acceptance of the updated Policy.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <ul>
                            <li>
                                <strong>Email:</strong>{" "}
                                <a href="mailto:maguire.murphy@live.com" className="text-brand-600 hover:text-brand-700">
                                    maguire.murphy@live.com
                                </a>
                            </li>
                            <li>
                                <strong>General Support:</strong>{" "}
                                <a href="mailto:maguire.murphy@live.com" className="text-brand-600 hover:text-brand-700">
                                    maguire.murphy@live.com
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
