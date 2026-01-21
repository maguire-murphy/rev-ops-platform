import { ArrowRight } from "lucide-react";

export function HowItWorks() {
    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-600">Get started in minutes</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        From signup to insights in under 5 minutes
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        No complex setup. No engineering required. The platform connects to your existing tools.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
                        <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-col">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white sm:shrink-0">
                                <span className="text-xl font-bold">1</span>
                            </div>
                            <div className="sm:min-w-0 sm:flex-1">
                                <p className="text-lg font-semibold leading-8 text-slate-900">Connect Stripe</p>
                                <p className="mt-2 text-base leading-7 text-slate-600">
                                    Securely connect your Stripe account with one click. We'll import your history and calculate your MRR instantly.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-col">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white sm:shrink-0">
                                <span className="text-xl font-bold">2</span>
                            </div>
                            <div className="sm:min-w-0 sm:flex-1">
                                <p className="text-lg font-semibold leading-8 text-slate-900">Sync HubSpot (Optional)</p>
                                <p className="mt-2 text-base leading-7 text-slate-600">
                                    Connect HubSpot to pull in deal data. We'll match deals to customers to give you full pipeline visibility.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-col">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white sm:shrink-0">
                                <span className="text-xl font-bold">3</span>
                            </div>
                            <div className="sm:min-w-0 sm:flex-1">
                                <p className="text-lg font-semibold leading-8 text-slate-900">See Your Real Metrics</p>
                                <p className="mt-2 text-base leading-7 text-slate-600">
                                    Your dashboard populates instantly. See your MRR, churn, and forecast without touching a spreadsheet.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <div className="flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Stripe Logo Placeholder */}
                            <div className="text-2xl font-bold text-slate-900">stripe</div>
                            <div className="text-2xl font-bold text-slate-300">+</div>
                            {/* HubSpot Logo Placeholder */}
                            <div className="text-2xl font-bold text-slate-900">HubSpot</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
