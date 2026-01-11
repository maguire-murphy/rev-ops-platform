import { NextRequest, NextResponse } from "next/server";
import { HUBSPOT_CONFIG, hubspotClient } from "@/server/integrations/hubspot";
import { db } from "@/server/db/client";
import { auth } from "@/server/auth";
import { encrypt } from "@/server/utils/encryption";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=${error}`);
    }

    if (!code) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=no_code`);
    }

    try {
        const session = await auth();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const organizationId = (session?.user as any)?.organizationId;

        if (!organizationId) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
        }

        const tokenResponse = await hubspotClient.oauth.tokensApi.createToken(
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

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?success=hubspot_connected`);

    } catch (err) {
        console.error("HubSpot OAuth Error:", err);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=oauth_failed`);
    }
}
