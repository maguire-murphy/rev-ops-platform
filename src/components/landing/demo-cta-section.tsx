import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DemoButton } from "@/components/demo-button";

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

                <DemoButton variant="primary" size="large" className="bg-navy-deep text-white hover:bg-navy-rich border-navy-deep hover:border-navy-rich shadow-xl hover:shadow-2xl text-xl py-5 px-12" />
            </div>
        </section>
    );
}
