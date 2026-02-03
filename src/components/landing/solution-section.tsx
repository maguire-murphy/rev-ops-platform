import { Plug, RefreshCw, BarChart3, ArrowRight } from "lucide-react";

export function SolutionSection() {
    return (
        <section className="bg-navy-deep py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-2xl mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-yellow-primary uppercase mb-4">
                        HOW IT WORKS
                    </h2>
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                        Three steps to clarity
                    </p>
                </div>

                <div className="relative grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3 items-center">

                    {/* Connecting Arrows (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 z-10 text-yellow-primary/50 animate-pulse">
                        <ArrowRight className="h-8 w-8" />
                    </div>
                    <div className="hidden lg:block absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 z-10 text-yellow-primary/50 animate-pulse">
                        <ArrowRight className="h-8 w-8" />
                    </div>

                    {/* Step 1: Connect */}
                    <div className="relative group flex flex-col items-center bg-navy-rich rounded-xl p-10 border border-white/5 shadow-lg hover:border-yellow-primary/30 transition-all duration-300">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-primary text-navy-deep text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                            1
                        </div>
                        <div className="mb-6 text-yellow-primary">
                            <Plug className="h-12 w-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Connect
                        </h3>
                        <p className="text-lg font-medium text-blue-200 mb-2">
                            Link Stripe and HubSpot
                        </p>
                        <p className="text-sm text-slate-400">
                            OAuth setup takes 2 minutes
                        </p>
                    </div>

                    {/* Step 2: Sync */}
                    <div className="relative group flex flex-col items-center bg-navy-rich rounded-xl p-10 border border-white/5 shadow-lg hover:border-yellow-primary/30 transition-all duration-300">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-primary text-navy-deep text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                            2
                        </div>
                        <div className="mb-6 text-yellow-primary">
                            <RefreshCw className="h-12 w-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Sync
                        </h3>
                        <p className="text-lg font-medium text-blue-200 mb-2">
                            Automatic data merging
                        </p>
                        <p className="text-sm text-slate-400">
                            Real-time updates
                        </p>
                    </div>

                    {/* Step 3: Understand */}
                    <div className="relative group flex flex-col items-center bg-navy-rich rounded-xl p-10 border border-white/5 shadow-lg hover:border-yellow-primary/30 transition-all duration-300">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-primary text-navy-deep text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                            3
                        </div>
                        <div className="mb-6 text-yellow-primary">
                            <BarChart3 className="h-12 w-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Understand
                        </h3>
                        <p className="text-lg font-medium text-blue-200 mb-2">
                            Unified metrics dashboard
                        </p>
                        <p className="text-sm text-slate-400">
                            No spreadsheets needed
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
