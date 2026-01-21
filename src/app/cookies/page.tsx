import Link from "next/link";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Cookie Policy",
    description: "Learn about how this platform uses cookies and similar tracking technologies.",
    path: "/cookies",
});

export default function CookiesPage() {
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
                    Cookie Policy
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Last updated: {lastUpdated}
                </p>

                <div className="prose prose-slate mt-12 max-w-none">
                    <section>
                        <h2>What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, making it easier to use the service and providing a better experience.
                        </p>
                    </section>

                    <section>
                        <h2>How We Use Cookies</h2>
                        <p>
                            This platform uses cookies and similar tracking technologies for the following purposes:
                        </p>

                        <h3>1. Essential Cookies</h3>
                        <p>
                            These cookies are necessary for the Service to function properly. They enable core functionality such as security, authentication, and accessibility.
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cookie Name</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>next-auth.session-token</code></td>
                                    <td>Authentication session</td>
                                    <td>30 days</td>
                                </tr>
                                <tr>
                                    <td><code>next-auth.csrf-token</code></td>
                                    <td>Security (CSRF protection)</td>
                                    <td>Session</td>
                                </tr>
                                <tr>
                                    <td><code>beacon-consent</code></td>
                                    <td>Remember your cookie preferences</td>
                                    <td>1 year</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>2. Analytics Cookies</h3>
                        <p>
                            These cookies help us understand how visitors interact with our Service by collecting and reporting information anonymously.
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cookie Name</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>ph_*</code></td>
                                    <td>PostHog analytics tracking</td>
                                    <td>1 year</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            <strong>You can opt out of analytics cookies.</strong> See "Managing Cookies" below.
                        </p>

                        <h3>3. Functional Cookies</h3>
                        <p>
                            These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cookie Name</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>beacon-theme</code></td>
                                    <td>Remember theme preference</td>
                                    <td>1 year</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h2>Third-Party Cookies</h2>
                        <p>
                            Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Please refer to the relevant third party's privacy policy for more information:
                        </p>
                        <ul>
                            <li><a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600">PostHog Privacy Policy</a> - Analytics</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Managing Cookies</h2>

                        <h3>Cookie Consent Banner</h3>
                        <p>
                            When you first visit our website, you'll see a cookie consent banner. You can choose to accept or decline non-essential cookies.
                        </p>

                        <h3>Browser Settings</h3>
                        <p>
                            Most web browsers allow you to control cookies through their settings. You can:
                        </p>
                        <ul>
                            <li>Block all cookies</li>
                            <li>Accept only first-party cookies</li>
                            <li>Delete cookies when you close your browser</li>
                            <li>See and delete existing cookies</li>
                        </ul>
                        <p>
                            Please note that blocking or deleting cookies may affect your ability to use certain features of our Service.
                        </p>

                        <h3>Opt-Out Links</h3>
                        <ul>
                            <li>
                                <strong>PostHog:</strong> You can opt out by clicking "Opt out of analytics" in your account settings
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>Do Not Track</h2>
                        <p>
                            Some browsers have a "Do Not Track" feature that lets you tell websites you do not want to have your online activities tracked. We currently do not respond to Do Not Track signals, but we respect your cookie preferences set through our consent banner.
                        </p>
                    </section>

                    <section>
                        <h2>Changes to This Cookie Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            If you have questions about our use of cookies, please contact us at{" "}
                            <a href="mailto:maguire.murphy@live.com" className="text-brand-600 hover:text-brand-700">
                                maguire.murphy@live.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
