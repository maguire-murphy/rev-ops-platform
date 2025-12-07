import { MrrMovementsTable } from "@/components/dashboard/mrr-movements-table";

export default function MrrPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">MRR Analytics</h2>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-slate-500 mb-4">MRR Chart will go here</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Movements</h3>
                <MrrMovementsTable />
            </div>
        </div>
    );
}
