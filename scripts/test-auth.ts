import { db } from "../src/server/db/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

async function testAuth() {
    console.log("Testing demo user authentication...");

    const user = await db.user.findUnique({
        where: { email: "demo@revops.app" },
    });

    if (!user) {
        console.log("❌ Demo user not found");
        return;
    }

    console.log("✅ User found:", user.email);
    console.log("Has password:", !!user.password);

    if (user.password) {
        const isValid = await bcrypt.compare("demo1234", user.password);
        console.log("Password validation:", isValid ? "✅ VALID" : "❌ INVALID");

        // Test the actual password hash
        console.log("Password hash starts with:", user.password.substring(0, 10));
    }

    await db.$disconnect();
}

testAuth();
