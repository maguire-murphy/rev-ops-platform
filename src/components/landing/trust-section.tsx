import { Check } from "lucide-react";

export function TrustSection() {
    return (
        <section className="bg-navy-deep relative py-20 lg:py-32">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-yellow-primary" />

            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-yellow-primary uppercase mb-4">
                        BUILT FOR FOUNDERS
                    </h2>
                    <h3 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                        Technical enough to trust.
                        <br />
                        Simple enough to use.
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Column 1: Secure Integrations */}
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-6">Secure Integrations</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">OAuth 2.0 authentication</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">Read-only API access</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">Encrypted data transmission</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">No sensitive data storage</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Modern Stack */}
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-6">Modern Stack</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">React frontend</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">Real-time data sync</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">RESTful API architecture</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-yellow-primary shrink-0" />
                                <span className="text-lg text-blue-200/80">Responsive design</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
