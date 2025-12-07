export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder cards */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-slate-500">Total MRR</h3>
                    </div>
                    <div className="text-2xl font-bold">$0.00</div>
                    <p className="text-xs text-slate-500">+0% from last month</p>
                </div>
            </div>
        </div>
    );
}
