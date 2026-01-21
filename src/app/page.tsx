import Link from "next/link";
import { BarChart2, Github, ArrowRight, Database, LineChart, Users, Target, Zap, FileText, Play } from "lucide-react";
import { DemoButton } from "@/components/demo-button";

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Simple Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <BarChart2 className="h-5 w-5" />
            </div>
            <span>RevOps Analytics</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm text-slate-600 hover:text-slate-900">
              Documentation
            </Link>
            <Link
              href="https://github.com/maguire-murphy/rev-ops-platform"
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <DemoButton size="default" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-100 bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Revenue Operations Analytics Platform
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Integrated metrics tracking for early-stage SaaS companies
              </p>
              <p className="mt-6 text-slate-600 leading-relaxed">
                A platform connecting Stripe and HubSpot to provide unified revenue visibility. 
                Tracks MRR, customer lifecycle, pipeline health, and churn patterns in one dashboard.
              </p>
              <div className="mt-8 flex gap-4">
                <DemoButton size="default" />
                <Link
                  href="/docs"
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About This Project */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-semibold text-slate-900">About This Project</h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed max-w-3xl">
              <p>
                Early-stage SaaS founders often struggle with fragmented revenue data across Stripe, 
                HubSpot, and spreadsheets. This creates blind spots in understanding customer lifetime 
                value, churn patterns, and cash flow.
              </p>
              <p>
                This platform integrates directly with Stripe and HubSpot to provide a single dashboard 
                for tracking MRR, customer metrics, and pipeline health. The feature set was designed 
                based on research into common founder workflows and existing tool gaps.
              </p>
              <p>
                The project includes market research, competitive analysis, feature specifications for 
                six core modules, and a working prototype with real API integrations.
              </p>
            </div>
          </div>
        </section>

        {/* Project Components */}
        <section className="border-t border-slate-100 bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-semibold text-slate-900">Project Components</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-medium text-slate-900">Research & Planning</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/docs/research/competitive-analysis" className="hover:text-indigo-600">
                      → Market landscape analysis
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/research/user-research" className="hover:text-indigo-600">
                      → User problem identification
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/project-overview" className="hover:text-indigo-600">
                      → Project overview
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Product Design</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/docs/feature-specs" className="hover:text-indigo-600">
                      → Feature specifications
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/technical-decisions" className="hover:text-indigo-600">
                      → Technical decisions
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/audit-report" className="hover:text-indigo-600">
                      → Build audit report
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Implementation</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    <Link href="/login" className="hover:text-indigo-600">
                      → Working prototype
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/maguire-murphy/rev-ops-platform" className="hover:text-indigo-600">
                      → Source code (GitHub)
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/project-retrospective" className="hover:text-indigo-600">
                      → Project retrospective
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-semibold text-slate-900">Platform Capabilities</h2>
            <p className="mt-2 text-slate-600">Core features implemented in the prototype</p>
            
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={LineChart}
                title="MRR Tracking"
                description="Real-time monthly recurring revenue with growth rates, waterfall analysis, and historical trends."
              />
              <FeatureCard
                icon={Users}
                title="Customer Intelligence"
                description="Unified customer view combining Stripe billing data with HubSpot CRM information."
              />
              <FeatureCard
                icon={Target}
                title="Pipeline Analytics"
                description="Deal board with stage tracking, weighted pipeline value, and conversion metrics."
              />
              <FeatureCard
                icon={Database}
                title="Retention Metrics"
                description="Churn rates, cohort analysis, and customer lifecycle tracking."
              />
              <FeatureCard
                icon={Zap}
                title="Stripe Integration"
                description="OAuth connection with real-time webhook processing for subscription events."
              />
              <FeatureCard
                icon={Zap}
                title="HubSpot Integration"
                description="OAuth connection syncing deals, companies, contacts, and activities."
              />
            </div>
          </div>
        </section>

        {/* Demo Access */}
        <section className="border-t border-slate-100 bg-gradient-to-b from-slate-50 to-indigo-50 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-xl border border-indigo-100 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                  <Play className="h-7 w-7 text-indigo-600" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Try the Platform</h2>
                <p className="mt-2 text-slate-600 max-w-md">
                  Explore the demo environment with pre-loaded sample data. One click to access.
                </p>
                <div className="mt-6">
                  <DemoButton size="large" />
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  No signup required. Demo includes 19 customers, 12 months of MRR data, and pipeline deals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-semibold text-slate-900">Technical Implementation</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js 16", "React 19", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Tailwind CSS", "Stripe API", "HubSpot API"].map((tech) => (
                <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-600 max-w-2xl">
              Built with AI development tools to focus effort on product decisions and feature design 
              rather than boilerplate implementation.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              A portfolio project by Maguire
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/maguire-murphy" className="text-sm text-slate-500 hover:text-slate-700">
                GitHub
              </Link>
              <Link href="https://linkedin.com/in/maguire-murphy" className="text-sm text-slate-500 hover:text-slate-700">
                LinkedIn
              </Link>
              <Link href="mailto:maguire.murphy@live.com" className="text-sm text-slate-500 hover:text-slate-700">
                Email
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-medium text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
