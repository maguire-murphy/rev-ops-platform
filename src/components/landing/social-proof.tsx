import { Star } from "lucide-react";

export function SocialProof() {
    return (
        <section className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-center text-lg font-semibold leading-8 text-slate-900 mb-10">
                        Trusted by forward-thinking SaaS teams
                    </h2>
                    <div className="mx-auto mt-10 grid grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        {/* Placeholder Logos - In a real app, use SVGs or Images */}
                        <div className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 font-bold text-2xl text-slate-400 flex items-center justify-center">Acme Corp</div>
                        <div className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 font-bold text-2xl text-slate-400 flex items-center justify-center">Tuple</div>
                        <div className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 font-bold text-2xl text-slate-400 flex items-center justify-center">Savvy</div>
                        <div className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 font-bold text-2xl text-slate-400 flex items-center justify-center">WorkOS</div>
                        <div className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 font-bold text-2xl text-slate-400 flex items-center justify-center">Linear</div>
                    </div>

                    {/* Testimonials */}
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col justify-between bg-white p-6 shadow-sm ring-1 ring-slate-200 rounded-2xl">
                            <div>
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-lg leading-7 text-slate-700">
                                    "This platform gives clarity on MRR that we never had with spreadsheets. It's the first tab I open every morning."
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-x-4">
                                <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Sarah Jenkins</h3>
                                    <p className="text-sm leading-6 text-slate-600">CEO, TechFlow</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between bg-white p-6 shadow-sm ring-1 ring-slate-200 rounded-2xl">
                            <div>
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-lg leading-7 text-slate-700">
                                    "The pipeline intelligence features helped us identify $50k in at-risk revenue just in time to save it. Pays for itself 10x over."
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-x-4">
                                <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Michael Chen</h3>
                                    <p className="text-sm leading-6 text-slate-600">VP Sales, CloudScale</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between bg-white p-6 shadow-sm ring-1 ring-slate-200 rounded-2xl">
                            <div>
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-lg leading-7 text-slate-700">
                                    "Finally, a tool that bridges the gap between Stripe and HubSpot. The forecasting accuracy is scary good."
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-x-4">
                                <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Elena Rodriguez</h3>
                                    <p className="text-sm leading-6 text-slate-600">Founder, SaaSy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
