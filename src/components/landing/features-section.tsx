import { TrendingUp, Users, AlertCircle, GitBranch, LayoutDashboard, Code2 } from "lucide-react";

export function FeaturesSection() {
    return (
        <section id="features" className="bg-navy-rich py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-yellow-primary uppercase mb-4">
                        WHAT YOU GET
                    </h2>
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                        The metrics that matter, unified
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="bg-navy-deep p-10 rounded-xl shadow-lg border-2 border-transparent hover:border-yellow-primary hover:-translate-y-1 transition-all duration-200">
                        <div className="mb-6">
                            <TrendingUp className="h-12 w-12 text-yellow-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Revenue Tracking</h3>
                        <p className="text-base text-blue-200/80 leading-relaxed">
                            Real-time MRR, ARR, and revenue forecasting. See exactly where your recurring revenue stands and where it's headed.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-navy-deep p-10 rounded-xl shadow-lg border-2 border-transparent hover:border-yellow-primary hover:-translate-y-1 transition-all duration-200">
                        <div className="mb-6">
                            <Users className="h-12 w-12 text-yellow-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Customer Lifecycle</h3>
                        <p className="text-base text-blue-200/80 leading-relaxed">
                            Track customer journey from lead to churned. Understand LTV, expansion revenue, and cohort behavior.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-navy-deep p-10 rounded-xl shadow-lg border-2 border-transparent hover:border-yellow-primary hover:-translate-y-1 transition-all duration-200">
                        <div className="mb-6">
                            <AlertCircle className="h-12 w-12 text-yellow-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Churn Analysis</h3>
                        <p className="text-base text-blue-200/80 leading-relaxed">
                            Identify cancellation patterns and retention metrics. Catch churn signals before they become trends.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-navy-deep p-10 rounded-xl shadow-lg border-2 border-transparent hover:border-yellow-primary hover:-translate-y-1 transition-all duration-200">
                        <div className="mb-6">
                            <GitBranch className="h-12 w-12 text-yellow-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Pipeline Health</h3>
                        <p className="text-base text-blue-200/80 leading-relaxed">
                            Connect sales pipeline to revenue outcomes. See which deals close and which fall through.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-navy-deep p-10 rounded-xl shadow-lg border-2 border-transparent hover:border-yellow-primary hover:-translate-y-1 transition-all duration-200">
                        <div className="mb-6">
                            <LayoutDashboard className="h-12 w-12 text-yellow-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Unified Dashboard</h3>
                        <p className="text-base text-blue-200/80 leading-relaxed">
                            Single-pane view of business health. No more toggling between tabs or reconciling spreadsheets.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-navy-deep p-10 rounded-xl shadow-lg border-2 border-transparent hover:border-yellow-primary hover:-translate-y-1 transition-all duration-200">
                        <div className="mb-6">
                            <Code2 className="h-12 w-12 text-yellow-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">API Integrations</h3>
                        <p className="text-base text-blue-200/80 leading-relaxed">
                            Direct connections to Stripe and HubSpot. Your data stays secure and always up-to-date.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
