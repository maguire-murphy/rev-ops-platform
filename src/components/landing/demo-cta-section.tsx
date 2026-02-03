import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DemoCtaSection() {
    return (
        <section id="demo" className="bg-yellow-primary py-20 lg:py-24">
            <div className="mx-auto max-w-4xl px-6 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-navy-deep sm:text-5xl mb-4">
                    Try Beacon with sample data
                </h2>
                <p className="text-lg text-navy-deep/80 mb-10 max-w-2xl mx-auto">
                    Explore the full platform with pre-loaded demo data.
                    <br className="hidden sm:inline" /> No signup required.
                </p>

                <Link
                    href="/dashboard/demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-navy-deep px-12 py-5 text-xl font-bold text-white shadow-xl hover:bg-navy-rich hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
                >
                    Launch Demo
                    <ArrowRight className="h-6 w-6" />
                </Link>
            </div>
        </section>
    );
}
