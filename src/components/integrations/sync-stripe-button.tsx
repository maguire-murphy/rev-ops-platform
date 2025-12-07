"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

export function SyncStripeButton() {
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const response = await fetch("/api/integrations/stripe/sync", {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error("Sync failed");
            }
            alert("Sync completed successfully!");
            // Ideally revalidate the page or show a toast
        } catch (error) {
            console.error(error);
            alert("Failed to sync data.");
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
        >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Data"}
        </button>
    );
}
