"use client";

import { useState } from "react";
import { disconnectIntegration } from "@/server/actions/integrations";
import { Loader2, Trash2 } from "lucide-react";

interface DisconnectButtonProps {
    provider: "stripe" | "hubspot";
}

export function DisconnectButton({ provider }: DisconnectButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDisconnect = async () => {
        if (!confirm(`Are you sure you want to disconnect ${provider}?`)) return;

        setIsLoading(true);
        try {
            await disconnectIntegration(provider);
            // Force page reload to show updated state
            window.location.reload();
        } catch (error) {
            console.error("Failed to disconnect:", error);
            alert(`Failed to disconnect ${provider}. Please try again.`);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDisconnect}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50 disabled:opacity-50"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
            Disconnect
        </button>
    );
}
