import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is my data secure?",
        answer:
            "Yes. We use 256-bit SSL encryption for data in transit and AES-256 encryption at rest. We follow industry best practices including SOC 2 compliance and regular security audits.",
    },
    {
        question: "Where is my data stored?",
        answer:
            "Your data is stored securely in US-based data centers operated by our trusted infrastructure partners. We use encrypted databases with automatic backups and disaster recovery.",
    },
    {
        question: "Do you sell my data to third parties?",
        answer:
            "Absolutely not. We never sell, share, or monetize your data. Your business data belongs to you. We only use it to provide you with analytics and insights within the platform.",
    },
    {
        question: "What integrations do you support?",
        answer:
            "This platform currently integrates with Stripe (for revenue data) and HubSpot (for pipeline data). Additional integrations could be added for Salesforce and Pipedrive.",
    },
    {
        question: "How long does setup take?",
        answer:
            "Most users are up and running in under 5 minutes. Just connect your Stripe account with one click, and your MRR metrics appear instantly. No engineering or technical knowledge required.",
    },
    {
        question: "Can I cancel anytime?",
        answer:
            "Absolutely. There are no long-term contracts for monthly plans. You can cancel your subscription at any time from your dashboard.",
    },
    {
        question: "Do you offer a free trial?",
        answer:
            "Yes! Our Free plan is free forever for up to $120K ARR. For larger plans, we offer a 14-day free trial so you can test the advanced features risk-free.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover) through Stripe. We bill monthly or annually, with a 20% discount on annual plans.",
    },
];

export function FAQSection() {
    return (
        <section className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-slate-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-slate-900">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-slate-900/10">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="pt-6">
                                <details className="group">
                                    <summary className="flex w-full items-start justify-between text-left text-slate-900 cursor-pointer list-none">
                                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                                            <Plus className="h-6 w-6 group-open:hidden" aria-hidden="true" />
                                            <Minus className="h-6 w-6 hidden group-open:block" aria-hidden="true" />
                                        </span>
                                    </summary>
                                    <p className="mt-2 pr-12 text-base leading-7 text-slate-600 pb-4">{faq.answer}</p>
                                </details>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
