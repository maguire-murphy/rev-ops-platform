import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import { LighthouseIcon } from "@/components/LighthouseIcon";

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 font-bold text-xl text-navy-deep">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-rich text-white">
                                <LighthouseIcon className="h-6 w-6" />
                            </div>
                            <span>Beacon</span>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600 max-w-xs">
                            A portfolio project exploring revenue operations analytics for early-stage SaaS companies.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <Link href="https://github.com/yourusername/revops-analytics" className="text-slate-400 hover:text-brand-600">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="https://linkedin.com/in/yourprofile" className="text-slate-400 hover:text-brand-600">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-slate-900">Product</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li>
                                <Link href="/#features" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/#pricing" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/integrations/stripe" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Integrations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-slate-900">Resources</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li>
                                <Link href="/docs" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/getting-started" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Getting Started
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold leading-6 text-slate-900">Legal</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li>
                                <Link href="/terms" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm leading-6 text-slate-600 hover:text-brand-600">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-200 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-slate-500">
                        A portfolio project by Maguire
                    </p>
                </div>
            </div>
        </footer>
    );
}
