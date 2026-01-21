import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Contact",
    description: "Get in touch about this portfolio project.",
    path: "/contact",
});

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-brand-600 hover:text-brand-700">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Contact
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    Interested in this project or want to connect? Here's how to reach me.
                </p>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {/* Email */}
                    <a
                        href="mailto:maguire.murphy@live.com"
                        className="group rounded-lg border border-slate-200 p-8 hover:border-brand-300 hover:shadow-md transition-all"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 group-hover:bg-brand-200 transition-colors">
                            <Mail className="h-6 w-6 text-brand-600" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">
                            Email
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Best for detailed questions or project discussions.
                        </p>
                        <p className="mt-4 text-sm font-medium text-brand-600 group-hover:text-brand-700">
                            maguire.murphy@live.com
                        </p>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/maguire-murphy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-lg border border-slate-200 p-8 hover:border-slate-400 hover:shadow-md transition-all"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                            <Github className="h-6 w-6 text-slate-700" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">
                            GitHub
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            View this project's source code and my other work.
                        </p>
                        <p className="mt-4 text-sm font-medium text-slate-700 group-hover:text-slate-900">
                            github.com/maguire-murphy
                        </p>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/maguire-murphy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-lg border border-slate-200 p-8 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                            <Linkedin className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">
                            LinkedIn
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Connect professionally or view my background.
                        </p>
                        <p className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                            linkedin.com/in/maguire-murphy
                        </p>
                    </a>
                </div>

                <div className="mt-12 rounded-lg bg-slate-50 p-8">
                    <h2 className="text-lg font-semibold text-slate-900">
                        About This Project
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        This RevOps Analytics Platform is a portfolio project demonstrating full-stack 
                        development skills, API integrations, and product thinking for B2B SaaS tools.
                    </p>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/docs"
                            className="inline-flex justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                        >
                            View Documentation
                        </Link>
                        <a
                            href="https://github.com/maguire-murphy/revops-analytics"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                        >
                            View Source Code
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
