import Link from "next/link";

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
                        <Link
                            href="/signup"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-brand-600 shadow-sm hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105"
                        >
                            Start Free
                        </Link>
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
