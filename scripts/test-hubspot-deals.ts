import { db } from "../src/server/db/client";
import { HubSpotSyncService } from "../src/server/services/hubspot-sync";
import { encrypt } from "../src/server/utils/encryption";

async function main() {
    console.log("Testing HubSpot Deal Sync...");

    const provider = "hubspot";
    let integration = await db.integration.findFirst({
        where: { provider }
    });

    if (!integration) {
        console.log("No HubSpot integration found. Creating a dummy one for testing...");
        const orgId = "00000000-0000-0000-0000-000000000000"; // Default

        // Ensure org exists
        await db.organization.upsert({
            where: { id: orgId },
            update: {},
            create: { id: orgId, name: "Test Org", slug: "test-org" }
        });

        integration = await db.integration.create({
            data: {
                organizationId: orgId,
                provider,
                stripeAccountId: "test-hub-id",
                accessTokenEncrypted: encrypt("fake-access-token"),
                refreshTokenEncrypted: encrypt("fake-refresh-token"),
                status: "active"
            }
        });
        console.log("Created dummy integration:", integration.id);
    } else {
        console.log("Found existing integration:", integration.id);
    }

    try {
        await HubSpotSyncService.syncDeals(integration.id);
        console.log("Deal Sync completed successfully (or at least didn't throw).");
    } catch (e: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = e as any;
        console.error("Sync failed as expected (invalid token):", err.message);
        if (err.response) {
            console.error("API Response:", err.response.body);
        }
    }
}

main()
    .catch(console.error)
    .finally(() => db.$disconnect());
