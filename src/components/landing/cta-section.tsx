import Link from "next/link";
import { DemoButton } from "@/components/demo-button";

export function CTASection() {
    return (
        <section className="bg-brand-900 py-24 sm:py-32 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 L100 0 L100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to see your real MRR?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-100">
                        Explore this revenue operations platform to see how unified metrics can transform SaaS decision-making.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <DemoButton variant="primary" className="bg-white text-brand-600 hover:bg-brand-50 border-white" />
                        <Link href="#demo" className="text-sm font-semibold leading-6 text-white hover:text-brand-100">
                            Talk to sales <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-brand-200">
                        No credit card required • Free up to $120K ARR
                    </p>
                </div>
            </div>
        </section>
    );
}
