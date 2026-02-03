import { CreditCard, Users, Table } from "lucide-react";

export function ProblemSection() {
    return (
        <section className="bg-navy-rich py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-2xl mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-yellow-primary uppercase mb-4">
                        THE PROBLEM
                    </h2>
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
                        Your revenue data is everywhere.
                        <br />
                        Your insights are nowhere.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Card 1: Stripe */}
                    <div className="flex flex-col items-start p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                            <CreditCard className="h-10 w-10 text-navy-rich" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-deep mb-3 text-left">
                            Stripe has your revenue
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed text-left">
                            But tracking MRR means custom queries and manual calculations.
                        </p>
                    </div>

                    {/* Card 2: HubSpot */}
                    <div className="flex flex-col items-start p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                            <Users className="h-10 w-10 text-navy-rich" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-deep mb-3 text-left">
                            HubSpot has your customers
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed text-left">
                            But connecting revenue to behavior means exports and pivot tables.
                        </p>
                    </div>

                    {/* Card 3: Spreadsheets */}
                    <div className="flex flex-col items-start p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200 md:col-span-2 lg:col-span-1">
                        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                            <Table className="h-10 w-10 text-navy-rich" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-deep mb-3 text-left">
                            Your spreadsheet has chaos
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed text-left">
                            Manual merging is slow, error-prone, and never up-to-date.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
