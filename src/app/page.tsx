import Link from "next/link";
import { BarChart3, LineChart, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6 lg:px-8">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            B
          </div>
          <span>Beacon</span>
        </div>
        <nav className="flex gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-slate-900 px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              RevOps for Startups
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Unify your billing, CRM, and pipeline data into a single source of truth.
              Built for B2B SaaS companies from $500K to $10M ARR.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link href="#" className="text-sm font-semibold leading-6 text-slate-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <BarChart3 className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Accurate MRR
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  Connect Stripe and get board-ready MRR metrics in minutes. Handle prorations, refunds, and upgrades automatically.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <LineChart className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Revenue Forecasting
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  Predict future revenue based on historical trends and your current pipeline. Know your runway with confidence.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <ShieldCheck className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Pipeline Intelligence
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">
                  Sync with HubSpot to see deal velocity, win rates, and pipeline coverage. Identify at-risk deals before they slip.
                </p>
              </dd>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
