import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";

    const integration = await db.integration.findFirst({
        where: {
            organizationId: TEST_ORG_ID,
            provider: "stripe",
        }
    });

    console.log("Integration found:", integration);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await db.$disconnect();
    });
