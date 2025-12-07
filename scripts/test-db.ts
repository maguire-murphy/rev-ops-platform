import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

async function main() {
    console.log("Testing Integration creation...");
    try {
        // Ensure org exists
        const org = await db.organization.upsert({
            where: { id: "00000000-0000-0000-0000-000000000000" },
            update: {},
            create: {
                id: "00000000-0000-0000-0000-000000000000",
                name: "Test Org",
                slug: "test-org"
            }
        });

        // Create integration
        const integration = await db.integration.create({
            data: {
                organizationId: org.id,
                provider: "stripe",
                stripeAccountId: "acct_test123",
                accessTokenEncrypted: "test_token",
                refreshTokenEncrypted: "test_refresh",
            },
        });
        console.log("Successfully created integration:", integration);

        // Clean up
        await db.integration.delete({ where: { id: integration.id } });
        console.log("Cleaned up test integration.");

    } catch (error) {
        console.error("Failed to create integration:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
