import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { StripeSyncService } from "../src/server/services/stripe-sync";

const db = new PrismaClient();

async function main() {
    console.log("Starting Stripe Sync Test...");

    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";

    try {
        const result = await StripeSyncService.syncOrganization(TEST_ORG_ID);
        console.log("Sync Result:", result);

        // Verify DB counts
        const customerCount = await db.customer.count({ where: { organizationId: TEST_ORG_ID } });
        const subCount = await db.subscription.count({ where: { organizationId: TEST_ORG_ID } });
        const movementCount = await db.mrrMovement.count({ where: { organizationId: TEST_ORG_ID } });

        console.log(`DB Counts: Customers=${customerCount}, Subs=${subCount}, Movements=${movementCount}`);

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
