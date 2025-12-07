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

    if (error) {
        return NextResponse.redirect(
            new URL("/settings?error=" + error, req.url)
        );
    }

    if (!code) {
        return NextResponse.redirect(
            new URL("/settings?error=missing_code", req.url)
        );
    }

    try {
        const tokenResponse = await exchangeStripeToken(code);
        console.log("Stripe Token Response:", JSON.stringify(tokenResponse, null, 2));

        // 1. Ensure Organization exists FIRST
        // Use a fixed UUID for the default organization
        const DEFAULT_ORG_ID = "00000000-0000-0000-0000-000000000000";
        let orgId = DEFAULT_ORG_ID;

        // If user already has an org, use it
        if ((session.user as any).organizationId) {
            orgId = (session.user as any).organizationId;
        } else {
            // Otherwise check/create default org
            const orgExists = await db.organization.findUnique({
                where: { id: DEFAULT_ORG_ID }
            });

            if (!orgExists) {
                await db.organization.create({
                    data: {
                        id: DEFAULT_ORG_ID,
                        name: "My Organization",
                        slug: "my-org"
                    }
                });

                // Link user to organization
                await db.user.update({
                    where: { id: session.user.id },
                    data: { organizationId: DEFAULT_ORG_ID }
                });
            }
        }

        // 2. Create Integration
        await db.integration.create({
            data: {
                organizationId: orgId,
                provider: "stripe",
                stripeAccountId: tokenResponse.stripe_user_id,
                accessTokenEncrypted: tokenResponse.access_token!, // In a real app, encrypt this!
                refreshTokenEncrypted: tokenResponse.refresh_token,
            },
        });

        return NextResponse.redirect(
            new URL("/settings?success=stripe_connected", req.url)
        );
    } catch (err) {
        console.error("Stripe OAuth error:", err);
        return NextResponse.redirect(
            new URL("/settings?error=oauth_failed", req.url)
        );
    }
}
