import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DemoButton } from "@/components/demo-button";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-24 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-brand-600 ring-1 ring-brand-900/10 hover:ring-brand-900/20 bg-brand-50">
                            New: Pipeline Intelligence for HubSpot <span className="font-semibold text-brand-600">Read more <span aria-hidden="true">&rarr;</span></span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                        Revenue Intelligence for <span className="text-brand-600">Scaling SaaS</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600 mb-10">
                        Connect Stripe and HubSpot to get enterprise-grade revenue analytics—without the enterprise price tag. Built for B2B SaaS companies scaling from $500K to $10M ARR.
                    </p>
                    <div className="flex items-center justify-center gap-x-6">
                        <DemoButton variant="primary" size="large" />
                        <Link href="#features" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-brand-600 transition-colors">
                            Learn more <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-brand-600" /> No credit card required</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-brand-600" /> 14-day free trial</span>
                    </div>
                </div>

                {/* Dashboard Mockup */}
                <div className="mt-16 flow-root sm:mt-24">
                    <div className="-m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <div className="rounded-md bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden">
                            {/* Mockup Content Placeholder - CSS Representation of a Dashboard */}
                            <div className="w-full aspect-[16/9] bg-slate-50 relative flex flex-col">
                                {/* Header */}
                                <div className="h-12 border-b border-slate-200 bg-white flex items-center px-4 gap-4">
                                    <div className="h-6 w-24 bg-slate-200 rounded animate-pulse"></div>
                                    <div className="flex-1"></div>
                                    <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                                </div>
                                {/* Body */}
                                <div className="flex-1 p-6 grid grid-cols-3 gap-6">
                                    {/* KPI Cards */}
                                    <div className="col-span-1 h-32 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                                        <div className="h-4 w-20 bg-slate-100 rounded mb-2"></div>
                                        <div className="h-8 w-32 bg-brand-100 rounded mb-4"></div>
                                        <div className="h-16 w-full bg-slate-50 rounded"></div>
                                    </div>
                                    <div className="col-span-1 h-32 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                                        <div className="h-4 w-20 bg-slate-100 rounded mb-2"></div>
                                        <div className="h-8 w-32 bg-brand-100 rounded mb-4"></div>
                                        <div className="h-16 w-full bg-slate-50 rounded"></div>
                                    </div>
                                    <div className="col-span-1 h-32 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                                        <div className="h-4 w-20 bg-slate-100 rounded mb-2"></div>
                                        <div className="h-8 w-32 bg-brand-100 rounded mb-4"></div>
                                        <div className="h-16 w-full bg-slate-50 rounded"></div>
                                    </div>
                                    {/* Main Chart */}
                                    <div className="col-span-2 h-64 bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col">
                                        <div className="h-6 w-48 bg-slate-100 rounded mb-4"></div>
                                        <div className="flex-1 bg-slate-50 rounded relative overflow-hidden">
                                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-100 to-transparent opacity-50"></div>
                                            <svg className="absolute bottom-0 left-0 right-0 h-full w-full" preserveAspectRatio="none">
                                                <path d="M0 100 Q 250 50 500 80 T 1000 20" fill="none" stroke="#4f46e5" strokeWidth="3" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Side List */}
                                    <div className="col-span-1 h-64 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                                        <div className="h-6 w-32 bg-slate-100 rounded mb-4"></div>
                                        <div className="space-y-3">
                                            <div className="h-8 w-full bg-slate-50 rounded"></div>
                                            <div className="h-8 w-full bg-slate-50 rounded"></div>
                                            <div className="h-8 w-full bg-slate-50 rounded"></div>
                                            <div className="h-8 w-full bg-slate-50 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
