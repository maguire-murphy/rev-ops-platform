import Link from "next/link";
import { BarChart2, Github, ArrowRight, Database, LineChart, Users, Target, Zap, FileText, Play } from "lucide-react";
import { DemoButton } from "@/components/demo-button";
import { LighthouseIcon } from "@/components/LighthouseIcon";
import { LandingHeader } from "@/components/landing/landing-header";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TrustSection } from "@/components/landing/trust-section";
import { DemoCtaSection } from "@/components/landing/demo-cta-section";
import { AboutSection } from "@/components/landing/about-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Simple Header */}
      <LandingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep py-20 lg:py-32">
          {/* Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-navy-rich/30 blur-3xl opacity-50" />
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-navy-rich/30 blur-3xl opacity-30" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-7xl leading-tight">
              Connect Stripe and HubSpot in minutes.
              <span className="block text-blue-200 mt-2">Get instant revenue analytics.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-200/80">
              Beacon bridges your payment processor and CRM to give you unified
              visibility into MRR, churn, and customer health—without the
              spreadsheet gymnastics.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <DemoButton variant="primary" size="large" />
              <Link
                href="https://github.com/maguire-murphy/rev-ops-platform"
                className="group flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-8 py-3.5 text-lg font-semibold text-white transition-all hover:border-yellow-primary hover:text-yellow-primary"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
            </div>

            {/* Visual Element */}
            <div className="mt-20 flex justify-center">
              <div className="relative flex items-center justify-center gap-8 rounded-2xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm max-w-3xl w-full">
                {/* Integration Flow */}
                <div className="flex items-center gap-4 sm:gap-12 text-blue-200">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#635BFF] text-white shadow-lg">
                      <span className="font-bold text-lg">S</span>
                    </div>
                    <span className="text-sm font-medium opacity-80">Stripe</span>
                  </div>

                  <div className="relative flex flex-col items-center text-yellow-primary">
                    <div className="h-0.5 w-12 sm:w-24 bg-gradient-to-r from-transparent via-yellow-primary/50 to-transparent" />
                    <ArrowRight className="absolute -top-2 h-5 w-5 animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center gap-3 relative">
                    <div className="absolute -inset-4 rounded-full bg-yellow-primary/20 blur-xl animate-pulse" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-rich border-2 border-yellow-primary text-white shadow-xl shadow-yellow-primary/20">
                      <LighthouseIcon className="h-10 w-10 text-yellow-primary" />
                    </div>
                    <span className="text-sm font-bold text-yellow-primary">Beacon</span>
                  </div>

                  <div className="relative flex flex-col items-center text-yellow-primary">
                    <div className="h-0.5 w-12 sm:w-24 bg-gradient-to-r from-transparent via-yellow-primary/50 to-transparent" />
                    <ArrowRight className="absolute -top-2 h-5 w-5 animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#FF7A59] text-white shadow-lg">
                      <span className="font-bold text-lg">H</span>
                    </div>
                    <span className="text-sm font-medium opacity-80">HubSpot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TrustSection />

        {/* About This Project */}
        <DemoCtaSection />
        <AboutSection />
      </main>

      <LandingFooter />
    </div>
  );
}


