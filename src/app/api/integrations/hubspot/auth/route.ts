import { NextResponse } from "next/server";
import { HUBSPOT_CONFIG, hubspotClient } from "@/server/integrations/hubspot";

export async function GET() {
    const authUrl = hubspotClient.oauth.getAuthorizationUrl(
        HUBSPOT_CONFIG.clientId,
        HUBSPOT_CONFIG.redirectUri,
        HUBSPOT_CONFIG.scopes
    );

    return NextResponse.redirect(authUrl);
}
