import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { LighthouseIcon } from "@/components/LighthouseIcon";

export function LandingFooter() {
    return (
        <footer className="bg-navy-darker py-16 text-center border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Brand */}
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-rich border border-white/10">
                        <LighthouseIcon className="h-5 w-5 text-yellow-primary" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">Beacon</span>
                </div>
                <p className="text-blue-200/60 mb-10 text-sm sm:text-base">
                    Revenue analytics for early-stage SaaS
                </p>

                {/* Nav Links */}
                <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-10 text-blue-200/80 font-medium">
                    <Link href="#features" className="hover:text-yellow-primary transition-colors">
                        Features
                    </Link>
                    <span className="hidden sm:inline text-white/10">|</span>
                    <Link href="/docs" className="hover:text-yellow-primary transition-colors">
                        Documentation
                    </Link>
                    <span className="hidden sm:inline text-white/10">|</span>
                    <Link href="https://github.com/maguire-murphy/rev-ops-platform" className="hover:text-yellow-primary transition-colors">
                        GitHub
                    </Link>
                </nav>

                {/* Attribution */}
                <div className="mb-8">
                    <p className="text-blue-200/80 mb-4 font-medium">Built by Maguire</p>
                    <div className="flex justify-center gap-6">
                        <Link
                            href="https://linkedin.com/in/maguire-murphy"
                            className="text-blue-200/60 hover:text-yellow-primary transition-colors p-2"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link
                            href="mailto:maguire.murphy@live.com"
                            className="text-blue-200/60 hover:text-yellow-primary transition-colors p-2"
                            aria-label="Email"
                        >
                            <Mail className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://github.com/maguire-murphy"
                            className="text-blue-200/60 hover:text-yellow-primary transition-colors p-2"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-xs text-slate-600">
                    &copy; 2025 &middot; Portfolio Project
                </p>
            </div>
        </footer>
    );
}
