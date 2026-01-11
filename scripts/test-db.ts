import { db } from "../src/server/db/client";

async function main() {
    console.log("Testing DB Connection...");
    try {
        const user = await db.user.findFirst();
        console.log("Found user:", user?.id);
    } catch (e) {
        console.error("DB Error:", e);
    }
}

main()
    .catch(console.error)
    .finally(() => db.$disconnect());
