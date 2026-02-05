import Link from "next/link";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Frequently Asked Questions",
    description: "Get answers to common questions about Beacon, integrations, and data security.",
    path: "/faq",
});

export default function FAQPage() {
    const faqs = [
        {
            category: "About This Project",
            questions: [
                {
                    q: "What is this platform?",
                    a: "Beacon is a revenue analytics platform. It demonstrates integration with Stripe and HubSpot APIs to track MRR, ARR, churn, retention, and pipeline metrics for B2B SaaS companies.",
                },
                {
                    q: "Who would use this type of tool?",
                    a: "This platform is designed for B2B SaaS companies in the $500K-$10M ARR range—founders, sales leaders, and operations teams who need visibility into revenue metrics without complex spreadsheets.",
                },
                {
                    q: "Is this a production application?",
                    a: "This is a demonstration with working integrations and full functionality. The demo environment uses sample data to showcase the platform's capabilities.",
                },
            ],
        },
        {
            category: "Technical Implementation",
            questions: [
                {
                    q: "What tech stack is used?",
                    a: "Next.js 16, React 19, TypeScript, Tailwind CSS for the frontend. tRPC, Prisma, and PostgreSQL for the backend. Stripe and HubSpot APIs for integrations.",
                },
                {
                    q: "How do the integrations work?",
                    a: "OAuth 2.0 for authentication with both Stripe and HubSpot. Webhooks provide real-time updates for subscription changes. API polling handles historical data backfill.",
                },
                {
                    q: "How is data security handled?",
                    a: "OAuth tokens are encrypted at rest using AES-256. All API calls use TLS. Multi-tenant data isolation ensures organizations only see their own data.",
                },
            ],
        },
        {
            category: "Features",
            questions: [
                {
                    q: "What metrics are tracked?",
                    a: "MRR, ARR, net revenue, churn rate (customer and revenue), retention cohorts, customer lifetime value (LTV), average revenue per account (ARPA), and pipeline analytics.",
                },
                {
                    q: "How does the cohort analysis work?",
                    a: "Customers are grouped by signup month. The platform tracks revenue and customer retention over time to visualize cohort performance.",
                },
                {
                    q: "What forecasting methods are used?",
                    a: "Simple linear projections based on historical growth rates. Three scenarios (conservative, moderate, aggressive) allow comparison of different growth assumptions.",
                },
            ],
        },
        {
            category: "Demo",
            questions: [
                {
                    q: "How do I access the demo?",
                    a: "Use the demo credentials: demo@revops.app / demo1234. The demo includes sample customers, subscriptions, MRR history, and pipeline deals.",
                },
                {
                    q: "Is the demo data realistic?",
                    a: "Yes, the demo data represents a typical early-stage SaaS company with 15+ customers, various subscription plans, expansions, contractions, and churn events over 12 months.",
                },
                {
                    q: "Can I modify the demo data?",
                    a: "The integrations are locked in demo mode to preserve the experience. To test with real data, you would clone the repository and connect your own Stripe/HubSpot accounts.",
                },
            ],
        },
        {
            category: "Contact",
            questions: [
                {
                    q: "How can I reach the developer?",
                    a: "Email: maguire.murphy@live.com. You can also find me on GitHub and LinkedIn. Links are in the footer.",
                },
                {
                    q: "Can I use this code?",
                    a: "This project is available under the MIT license. Feel free to explore, learn from, or adapt the code for your own projects.",
                },
                {
                    q: "Is the source code available?",
                    a: "Yes, the full source code is available on GitHub. See the README for setup instructions.",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-brand-600 hover:text-brand-700">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Frequently Asked Questions
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Quick answers to common questions about the platform.
                </p>

                <div className="mt-12 space-y-16">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {category.category}
                            </h2>
                            <dl className="mt-6 space-y-8">
                                {category.questions.map((faq, faqIndex) => (
                                    <div key={faqIndex}>
                                        <dt className="text-lg font-semibold text-slate-900">
                                            {faq.q}
                                        </dt>
                                        <dd className="mt-2 text-base text-slate-600">
                                            {faq.a}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                </div>

                <div className="mt-16 rounded-lg bg-slate-50 p-8">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Still have questions?
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Can't find the answer you're looking for? We're here to help.
                    </p>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="inline-flex justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                        >
                            Contact Support
                        </Link>
                        <Link
                            href="/docs"
                            className="inline-flex justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                        >
                            Browse Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
