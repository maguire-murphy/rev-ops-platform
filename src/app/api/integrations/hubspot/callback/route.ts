import { NextRequest, NextResponse } from "next/server";
import { HUBSPOT_CONFIG, hubspotClient } from "@/server/integrations/hubspot";
import { db } from "@/server/db/client";
import { auth } from "@/server/auth";
import { encrypt } from "@/server/utils/encryption";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");
    const state = req.nextUrl.searchParams.get("state");

    // Determine redirect base based on state
    let errorRedirectBase = `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations`;
    if (state) {
        try {
            const parsedState = JSON.parse(decodeURIComponent(state));
            if (parsedState.source === "onboarding") {
                errorRedirectBase = `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`;
            }
        } catch (e) {
            // Ignore parse errors
        }
    }

    if (error) {
        return NextResponse.redirect(`${errorRedirectBase}?error=${error}`);
    }

    if (!code) {
        return NextResponse.redirect(`${errorRedirectBase}?error=no_code`);
    }

    try {
        const session = await auth();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const organizationId = (session?.user as any)?.organizationId;

        if (!organizationId) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
        }

        const tokenResponse = await hubspotClient.oauth.tokensApi.create(
            "authorization_code",
            code,
            HUBSPOT_CONFIG.redirectUri,
            HUBSPOT_CONFIG.clientId,
            HUBSPOT_CONFIG.clientSecret
        );

        const { accessToken, refreshToken } = tokenResponse;

        const existingIntegration = await db.integration.findFirst({
            where: {
                organizationId,
                provider: "hubspot",
            }
        });

        if (existingIntegration) {
            await db.integration.update({
                where: { id: existingIntegration.id },
                data: {
                    accessTokenEncrypted: encrypt(accessToken),
                    refreshTokenEncrypted: refreshToken ? encrypt(refreshToken) : null,
                    status: "active",
                    lastSyncAt: new Date(),
                }
            });
        } else {
            await db.integration.create({
                data: {
                    organizationId,
                    provider: "hubspot",
                    accessTokenEncrypted: encrypt(accessToken),
                    refreshTokenEncrypted: refreshToken ? encrypt(refreshToken) : null,
                    status: "active",
                    lastSyncAt: new Date(),
                }
            });
        }

        // Determine redirect URL based on state
        let redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?success=hubspot_connected`;
        const state = req.nextUrl.searchParams.get("state");
        if (state) {
            try {
                const parsedState = JSON.parse(decodeURIComponent(state));
                if (parsedState.source === "onboarding") {
                    redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`;
                }
            } catch (e) {
                console.error("Failed to parse state:", e);
            }
        }

        return NextResponse.redirect(redirectUrl);

    } catch (err) {
        console.error("HubSpot OAuth Error:", err);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=oauth_failed`);
    }
}
