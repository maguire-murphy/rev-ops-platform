import Link from "next/link";
import { ArrowRight, Github, FileText, BookOpen } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="bg-navy-rich py-20 lg:py-32 border-t border-white/5">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
                    About Beacon
                </h2>

                <div className="space-y-6 text-lg text-blue-200/80 leading-relaxed mb-12">
                    <p>
                        Beacon is a project exploring revenue operations challenges
                        for early-stage SaaS companies. It demonstrates product development
                        from market research and feature specification through implementation.
                    </p>
                    <p>
                        This project includes competitive analysis, detailed product
                        specifications, and a working prototype with real Stripe and
                        HubSpot API integrations.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    <Link
                        href="/docs"
                        className="flex items-center gap-2 text-yellow-primary font-semibold hover:text-yellow-soft hover:underline underline-offset-4 transition-all"
                    >
                        Full Documentation
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="https://github.com/maguire-murphy/rev-ops-platform"
                        className="flex items-center gap-2 text-yellow-primary font-semibold hover:text-yellow-soft hover:underline underline-offset-4 transition-all"
                    >
                        View on GitHub
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
