import { PrismaClient } from "@prisma/client";
import { MrrService } from "../src/server/services/mrr-service";

const db = new PrismaClient({
    log: ["error"],
});

async function main() {
    console.log("Starting MRR Snapshot Test...");

    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";

    try {
        // 1. Ensure we have some active subscriptions
        // We rely on the data from the previous test (test-mrr.ts)
        // But let's make sure we have at least one active sub for the snapshot to be non-zero
        // Or we can just run it and see what we get.

        console.log("Creating daily snapshot...");
        const totalMrr = await MrrService.createDailySnapshot(TEST_ORG_ID);
        console.log(`Snapshot created. Total MRR: ${totalMrr}`);

        // 2. Verify in DB
        const snapshot = await db.mrrSnapshot.findFirst({
            where: { organizationId: TEST_ORG_ID },
            orderBy: { snapshotDate: 'desc' }
        });

        if (snapshot) {
            console.log("✅ Verification Successful: Snapshot found in DB.");
            console.log("Snapshot Date:", snapshot.snapshotDate);
            console.log("Total MRR:", snapshot.totalMrr);
        } else {
            console.error("❌ Verification Failed: No snapshot found.");
        }

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
