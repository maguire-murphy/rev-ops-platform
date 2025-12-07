import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";
    console.log("Clearing local data for org:", TEST_ORG_ID);

    // Delete in order of dependencies
    await db.mrrMovement.deleteMany({ where: { organizationId: TEST_ORG_ID } });
    await db.subscription.deleteMany({ where: { organizationId: TEST_ORG_ID } });
    // Note: Customers might be linked to other things, but for this test org it should be fine.
    // However, if we have other tests running, be careful.
    // For now, let's just delete customers for this org.
    await db.customer.deleteMany({ where: { organizationId: TEST_ORG_ID } });

    console.log("Cleared local data.");
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
        await db.$disconnect();
    });
