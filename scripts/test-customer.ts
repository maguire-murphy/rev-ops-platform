import { appRouter } from "../src/server/api/root";
import { db } from "../src/server/db/client";
import "dotenv/config";

async function main() {
    // 1. Setup Context
    // We need a valid session. We'll use the dev user ID.
    const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";

    // Ensure dev user exists (should be done by check-dev-user, but let's be safe)
    const user = await db.user.findUnique({ where: { id: DEV_USER_ID } });
    if (!user) {
        console.error("Dev user not found. Run check-dev-user.ts first.");
        process.exit(1);
    }

    // Mock context manually
    const ctx = {
        db,
        session: {
            user: { id: DEV_USER_ID, name: "Dev User", email: "dev@example.com" },
            expires: "2099-01-01",
        },
        headers: new Headers(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any; // Force type for test script

    const caller = appRouter.createCaller(ctx);

    console.log("Testing customer.getAll...");
    const customers = await caller.customer.getAll();
    console.log(`Found ${customers.length} customers.`);
    if (customers.length > 0) {
        console.log("First customer:", customers[0]);
    }

    if (customers.length > 0) {
        const firstId = customers[0].id;
        console.log(`Testing customer.getById(${firstId})...`);
        const customer = await caller.customer.getById({ id: firstId });
        console.log("Customer Details:", {
            name: customer.name,
            mrr: customer.currentMrr,
            subs: customer.subscriptions.length,
            movements: customer.mrrMovements.length,
        });
    } else {
        console.log("No customers to test getById.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
