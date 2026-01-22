import { db } from "../src/server/db/client";
import "dotenv/config";

async function checkDemoUser() {
    console.log("Checking for demo user...");

    const user = await db.user.findUnique({
        where: { email: "demo@revops.app" },
        include: {
            organization: true
        }
    });

    if (user) {
        console.log("✅ Demo user found!");
        console.log("Email:", user.email);
        console.log("Name:", user.name);
        console.log("Has password:", !!user.password);
        console.log("Organization:", user.organization?.name);
    } else {
        console.log("❌ Demo user NOT found");
    }

    await db.$disconnect();
}

checkDemoUser();
