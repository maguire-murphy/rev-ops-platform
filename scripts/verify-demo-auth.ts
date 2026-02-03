
import { db } from "../src/server/db/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config({ path: ".env.local" });

const DEMO_EMAIL = "demo@revops.app";
const DEMO_PASSWORD = "demo1234";

async function verifyAuth() {
    console.log("🔍 Verifying Demo Authentication...");
    console.log(`Checking user: ${DEMO_EMAIL}`);
    console.log("Auth Secret:", process.env.AUTH_SECRET ? "Present" : "Missing"); // Don't log the secret

    try {
        const user = await db.user.findUnique({
            where: { email: DEMO_EMAIL },
        });

        if (!user) {
            console.error("❌ User NOT FOUND in database!");
            return;
        }

        console.log("✅ User found:", user.id);
        console.log("   Name:", user.name);
        console.log("   Role:", user.role);

        if (!user.password) {
            console.error("❌ User has NO PASSWORD set!");
            return;
        }

        console.log("🔐 Verifying password...");
        const isValid = await bcrypt.compare(DEMO_PASSWORD, user.password);

        if (isValid) {
            console.log("✅ Password match! Credentials are correct.");
        } else {
            console.error("❌ Password MISMATCH!");
        }

    } catch (error) {
        console.error("❌ Database/Auth Error:", error);
    } finally {
        await db.$disconnect();
    }
}

verifyAuth();
