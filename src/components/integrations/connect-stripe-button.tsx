"use client";

import { STRIPE_OAUTH_URL } from "@/server/integrations/stripe";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ConnectStripeButton() {
    const [oauthUrl, setOauthUrl] = useState("");

    useEffect(() => {
        const clientId = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID;
        const redirectUri = `${window.location.origin}/api/integrations/stripe/callback`;
        setOauthUrl(
            `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&redirect_uri=${encodeURIComponent(
                redirectUri
            )}`
        );
    }, []);

    if (!oauthUrl) {
        return (
            <button disabled className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 opacity-50 cursor-not-allowed">
                Loading...
            </button>
        );
    }

    return (
        <Link
            href={oauthUrl}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2"
        >
            Connect Stripe
        </Link>
    );
}
