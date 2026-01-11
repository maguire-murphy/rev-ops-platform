import { db } from "../src/server/db/client";
import "dotenv/config";

async function main() {
    const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";
    const DEFAULT_ORG_ID = "00000000-0000-0000-0000-000000000000";

    // 1. Ensure Organization Exists
    let org = await db.organization.findUnique({
        where: { id: DEFAULT_ORG_ID },
    });

    if (!org) {
        console.log("Creating default organization...");
        org = await db.organization.create({
            data: {
                id: DEFAULT_ORG_ID,
                name: "Demo Corp",
                slug: "demo-corp",
            },
        });
    } else {
        console.log("Default organization found.");
    }

    // 2. Ensure Dev User Exists and is linked
    let user = await db.user.findUnique({
        where: { id: DEV_USER_ID },
    });

    if (!user) {
        console.log("Creating dev user...");
        user = await db.user.create({
            data: {
                id: DEV_USER_ID,
                email: "dev@example.com",
                name: "Dev User",
                organizationId: DEFAULT_ORG_ID,
                role: "owner",
            },
        });
    } else {
        console.log("Dev user found.");
        if (user.organizationId !== DEFAULT_ORG_ID) {
            console.log("Linking dev user to default org...");
            await db.user.update({
                where: { id: DEV_USER_ID },
                data: { organizationId: DEFAULT_ORG_ID },
            });
        }
    }

    console.log("Dev user setup complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
