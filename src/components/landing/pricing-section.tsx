"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { DemoButton } from "@/components/demo-button";

const tiers = [
    {
        name: "Free",
        id: "tier-free",
        href: "/signup",
        priceMonthly: "$0",
        priceAnnual: "$0",
        description: "Perfect for early-stage startups just getting started.",
        features: [
            "Up to $120K ARR",
            "Real-time MRR Dashboard",
            "Stripe Integration",
            "Basic Churn Metrics",
            "1 User Seat",
        ],
        mostPopular: false,
    },
    {
        name: "Starter",
        id: "tier-starter",
        href: "/signup",
        priceMonthly: "$99",
        priceAnnual: "$79",
        description: "For growing startups needing deeper insights.",
        features: [
            "Up to $1M ARR",
            "Everything in Free",
            "HubSpot Integration",
            "Revenue Forecasting",
            "Cohort Analysis",
            "3 User Seats",
        ],
        mostPopular: false,
    },
    {
        name: "Growth",
        id: "tier-growth",
        href: "/signup",
        priceMonthly: "$299",
        priceAnnual: "$239",
        description: "For scaling companies with sales teams.",
        features: [
            "Up to $5M ARR",
            "Everything in Starter",
            "Pipeline Intelligence",
            "Advanced Forecasting Scenarios",
            "Priority Support",
            "Unlimited User Seats",
        ],
        mostPopular: true,
    },
    {
        name: "Scale",
        id: "tier-scale",
        href: "/signup",
        priceMonthly: "$599",
        priceAnnual: "$479",
        description: "For established companies needing enterprise control.",
        features: [
            "Up to $10M ARR",
            "Everything in Growth",
            "Dedicated Success Manager",
            "Custom Contracts",
            "SLA",
            "SSO (Coming Soon)",
        ],
        mostPopular: false,
    },
];

export function PricingSection() {
    const [annual, setAnnual] = useState(true);

    return (
        <section id="pricing" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Pricing that scales with you
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
                    Start for free. Upgrade as you grow. No hidden fees.
                </p>

                <div className="mt-16 flex justify-center">
                    <div className="relative flex rounded-full bg-slate-100 p-1">
                        <button
                            type="button"
                            className={`${!annual ? "bg-white shadow-sm" : "hover:bg-slate-50"
                                } relative rounded-full py-2 px-6 text-sm font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all`}
                            onClick={() => setAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            className={`${annual ? "bg-white shadow-sm" : "hover:bg-slate-50"
                                } relative ml-0.5 rounded-full py-2 px-6 text-sm font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all`}
                            onClick={() => setAnnual(true)}
                        >
                            Annual <span className="text-brand-600 text-xs ml-1 font-bold">-20%</span>
                        </button>
                    </div>
                </div>

                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-4">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`${tier.mostPopular ? "ring-2 ring-brand-600" : "ring-1 ring-slate-200"
                                } rounded-3xl p-8 xl:p-10 flex flex-col justify-between relative bg-white`}
                        >
                            {tier.mostPopular && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="bg-brand-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">Most Popular</span>
                                </div>
                            )}
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3
                                        id={tier.id}
                                        className={`${tier.mostPopular ? "text-brand-600" : "text-slate-900"
                                            } text-lg font-semibold leading-8`}
                                    >
                                        {tier.name}
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{tier.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                                        {annual ? tier.priceAnnual : tier.priceMonthly}
                                    </span>
                                    <span className="text-sm font-semibold leading-6 text-slate-600">/month</span>
                                </p>
                                {annual && tier.priceMonthly !== "$0" && (
                                    <p className="text-xs text-slate-500 mt-1">Billed annually</p>
                                )}
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <Check className="h-6 w-5 flex-none text-brand-600" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8">
                                <DemoButton
                                    variant={tier.mostPopular ? "primary" : "secondary"}
                                    className="w-full justify-center"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
