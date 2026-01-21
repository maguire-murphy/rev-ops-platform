import { BarChart3, LineChart, ShieldCheck, Zap, Users } from "lucide-react";

export function FeaturesSection() {
    return (
        <section id="features" className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-600">Everything you need</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        A complete operating system for your revenue
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Replace messy spreadsheets with a real-time, automated revenue dashboard.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-600 text-white">
                                    <BarChart3 className="h-6 w-6" aria-hidden="true" />
                                </div>
                                Accurate MRR Analytics
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">
                                    Connect Stripe and get board-ready MRR metrics in minutes. We handle prorations, refunds, upgrades, and downgrades automatically so you can trust your numbers.
                                </p>
                            </dd>
                        </div>
                        <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-600 text-white">
                                    <LineChart className="h-6 w-6" aria-hidden="true" />
                                </div>
                                Revenue Forecasting
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">
                                    Predict future revenue based on historical trends and your current pipeline. Create conservative, moderate, and aggressive scenarios to plan your runway with confidence.
                                </p>
                            </dd>
                        </div>
                        <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-600 text-white">
                                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                                </div>
                                Pipeline Intelligence
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">
                                    Sync with HubSpot to see deal velocity, win rates, and pipeline coverage. Identify at-risk deals before they slip and improve your sales forecast accuracy.
                                </p>
                            </dd>
                        </div>
                        <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-600 text-white">
                                    <Users className="h-6 w-6" aria-hidden="true" />
                                </div>
                                Churn & Retention
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">
                                    Visualize cohort retention and identify churn patterns. See exactly which customers are at risk and take action to retain them before it's too late.
                                </p>
                            </dd>
                        </div>
                        <div className="flex flex-col bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-600 text-white">
                                    <Zap className="h-6 w-6" aria-hidden="true" />
                                </div>
                                One-Click Integrations
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">
                                    No engineering required. Connect Stripe and HubSpot with a single click. We securely sync your data and keep it up to date automatically.
                                </p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
