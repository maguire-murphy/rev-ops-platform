import Link from "next/link";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Terms of Service",
    description: "Terms of Service for the RevOps Analytics Platform portfolio project.",
    path: "/terms",
});

export default function TermsPage() {
    const lastUpdated = "January 21, 2026";

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-brand-600 hover:text-brand-700">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Terms of Service
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Last updated: {lastUpdated}
                </p>

                <div className="prose prose-slate mt-12 max-w-none">
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-6 not-prose mb-8">
                        <p className="text-amber-800 text-sm">
                            <strong>Note:</strong> This is a portfolio demonstration project. The terms below are provided for 
                            completeness but this is not a commercial service.
                        </p>
                    </div>

                    <section>
                        <h2>About This Project</h2>
                        <p>
                            The RevOps Analytics Platform is a portfolio project demonstrating revenue operations 
                            analytics capabilities. It integrates with Stripe and HubSpot APIs to provide MRR tracking, 
                            churn analytics, and pipeline visibility.
                        </p>
                    </section>

                    <section>
                        <h2>Demo Usage</h2>
                        <p>
                            The demo environment is provided for demonstration purposes. Sample data is used to 
                            showcase platform features. Users should not enter real customer data or connect 
                            production API accounts to the demo.
                        </p>
                    </section>

                    <section>
                        <h2>Open Source License</h2>
                        <p>
                            This project is available under the MIT License. You are free to use, modify, and 
                            distribute the code in accordance with the license terms.
                        </p>
                        <p>
                            See the{" "}
                            <a 
                                href="https://github.com/yourusername/revops-analytics/blob/main/LICENSE" 
                                className="text-brand-600 hover:text-brand-700"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LICENSE file
                            </a>{" "}
                            in the repository for full details.
                        </p>
                    </section>

                    <section>
                        <h2>No Warranty</h2>
                        <p>
                            This software is provided "as is" without warranty of any kind. This is a demonstration 
                            project and should not be used for production business operations without appropriate 
                            review and modification.
                        </p>
                    </section>

                    <section>
                        <h2>Contact</h2>
                        <p>
                            For questions about this project, contact{" "}
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
