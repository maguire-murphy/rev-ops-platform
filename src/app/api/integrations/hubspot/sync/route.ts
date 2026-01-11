import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { HubSpotSyncService } from "@/server/services/hubspot-sync";

export async function POST() {
    try {
        const session = await auth();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const organizationId = (session?.user as any)?.organizationId;

        if (!organizationId) {
            return new NextResponse("Unauthorized: No organization found", { status: 401 });
        }

        const integration = await db.integration.findFirst({
            where: {
                organizationId,
                provider: "hubspot",
            },
        });

        if (!integration) {
            return new NextResponse("No HubSpot integration found", { status: 404 });
        }

        await HubSpotSyncService.syncCompanies(integration.id);
        await HubSpotSyncService.syncDeals(integration.id);
        await HubSpotSyncService.syncActivities(integration.id);

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        console.error("HubSpot sync failed:", error);
        return new NextResponse(errorMessage, { status: 500 });
    }
}
