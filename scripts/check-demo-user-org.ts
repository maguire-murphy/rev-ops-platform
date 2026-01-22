import { db } from "../src/server/db/client";
import "dotenv/config";

async function checkDemoUser() {
    console.log("Checking demo user organizationId...");

    const user = await db.user.findUnique({
        where: { email: "demo@revops.app" },
        select: {
            id: true,
            email: true,
            organizationId: true,
            organization: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    if (user) {
        console.log("User ID:", user.id);
        console.log("Email:", user.email);
        console.log("OrganizationId:", user.organizationId);
        console.log("Organization:", user.organization?.name);

        if (!user.organizationId) {
            console.log("\n❌ PROBLEM: User has no organizationId!");
            console.log("This will cause redirect to /onboarding");
        } else {
            console.log("\n✅ User has organizationId set correctly");
        }
    } else {
        console.log("❌ Demo user not found");
    }

    await db.$disconnect();
}

checkDemoUser();
