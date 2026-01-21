import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { exchangeStripeToken } from "@/server/integrations/stripe";

export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state");

    // Determine redirect base based on state
    let errorRedirectBase = "/settings";
    if (state) {
        try {
            const parsedState = JSON.parse(decodeURIComponent(state));
            if (parsedState.source === "onboarding") {
                errorRedirectBase = "/onboarding";
            }
        } catch (e) {
            // Ignore parse errors
        }
    }

    if (error) {
        return NextResponse.redirect(
            new URL(`${errorRedirectBase}?error=${error}`, req.url)
        );
    }

    if (!code) {
        return NextResponse.redirect(
            new URL(`${errorRedirectBase}?error=missing_code`, req.url)
        );
    }

    try {
        // Fetch user's organizationId from database
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            console.error("User has no organization:", session.user.id);
            return NextResponse.redirect(
                new URL("/settings?error=no_organization", req.url)
            );
        }

        const tokenResponse = await exchangeStripeToken(code);
        console.log("Stripe Token Response:", JSON.stringify(tokenResponse, null, 2));

        // Check if integration already exists for this org
        const existingIntegration = await db.integration.findFirst({
            where: {
                organizationId: user.organizationId,
                provider: "stripe",
            },
        });

        if (existingIntegration) {
            // Update existing integration
            await db.integration.update({
                where: { id: existingIntegration.id },
                data: {
                    stripeAccountId: tokenResponse.stripe_user_id,
                    accessTokenEncrypted: tokenResponse.access_token!, // In a real app, encrypt this!
                    refreshTokenEncrypted: tokenResponse.refresh_token,
                },
            });
        } else {
            // Create new integration
            await db.integration.create({
                data: {
                    organizationId: user.organizationId,
                    provider: "stripe",
                    stripeAccountId: tokenResponse.stripe_user_id,
                    accessTokenEncrypted: tokenResponse.access_token!, // In a real app, encrypt this!
                    refreshTokenEncrypted: tokenResponse.refresh_token,
                },
            });
        }

        // Determine redirect URL based on state
        let redirectUrl = "/settings?success=stripe_connected";
        const state = searchParams.get("state");
        if (state) {
            try {
                const parsedState = JSON.parse(decodeURIComponent(state));
                if (parsedState.source === "onboarding") {
                    redirectUrl = "/onboarding";
                }
            } catch (e) {
                console.error("Failed to parse state:", e);
            }
        }

        return NextResponse.redirect(new URL(redirectUrl, req.url));
    } catch (err) {
        console.error("Stripe OAuth error:", err);
        return NextResponse.redirect(
            new URL("/settings?error=oauth_failed", req.url)
        );
    }
}
