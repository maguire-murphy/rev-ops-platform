"use client";

import Link from "next/link";

export function ConnectHubSpotButton() {
    return (
        <Link
            href="/api/integrations/hubspot/auth"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#ff7a59] text-white hover:bg-[#ff8f73] h-10 px-4 py-2"
        >
            Connect HubSpot
        </Link>
    );
}
