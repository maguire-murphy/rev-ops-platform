"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export function SyncHubSpotButton() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSync = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/integrations/hubspot/sync", {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Sync failed");
            }

            router.refresh();
            alert("HubSpot sync initiated!");
        } catch (error) {
            console.error(error);
            alert("Failed to sync HubSpot data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSync}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
        >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Syncing..." : "Sync Now"}
        </button>
    );
}
