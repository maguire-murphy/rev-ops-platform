import { PrismaClient } from "@prisma/client";
import { MrrService } from "../src/server/services/mrr-service";

const db = new PrismaClient({
    log: ["error"],
});

async function main() {
    console.log("Starting MRR Calculation Test...");

    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";
    const TEST_CUSTOMER_ID = "cus_test_mrr_123";
    const TEST_SUB_ID = "sub_test_mrr_123";

    try {
        // 1. Setup: Ensure Org and Customer exist
        await db.organization.upsert({
            where: { id: TEST_ORG_ID },
            update: {},
            create: { id: TEST_ORG_ID, name: "MRR Test Org", slug: "mrr-test-org" }
        });

        const customer = await db.customer.upsert({
            where: { stripeCustomerId: TEST_CUSTOMER_ID },
            update: {},
            create: {
                organizationId: TEST_ORG_ID,
                stripeCustomerId: TEST_CUSTOMER_ID,
                name: "MRR Test Customer"
            }
        });

        // Clean up previous test data
        await db.mrrMovement.deleteMany({ where: { customerId: customer.id } });
        await db.subscription.deleteMany({ where: { stripeSubscriptionId: TEST_SUB_ID } });

        console.log("Setup complete. Running scenarios...");

        // Scenario 1: New Subscription ($100/mo)
        console.log("\n--- Scenario 1: New Subscription ($100) ---");
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: TEST_SUB_ID,
            stripeCustomerId: TEST_CUSTOMER_ID,
            status: "active",
            amount: 10000,
            interval: "month"
        });

        // Create the subscription record (simulating webhook flow)
        await db.subscription.create({
            data: {
                organizationId: TEST_ORG_ID,
                customerId: customer.id,
                stripeSubscriptionId: TEST_SUB_ID,
                status: "active",
                amount: 10000,
                billingInterval: "month",
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(),
                startedAt: new Date(),
            }
        });

        let movements = await db.mrrMovement.findMany({
            where: { customerId: customer.id },
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        console.log("Movement:", movements[0]?.movementType, movements[0]?.mrrAmount);


        // Scenario 2: Upgrade ($200/mo)
        console.log("\n--- Scenario 2: Upgrade ($200) ---");
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: TEST_SUB_ID,
            stripeCustomerId: TEST_CUSTOMER_ID,
            status: "active",
            amount: 20000,
            interval: "month"
        });

        // Update subscription
        await db.subscription.update({
            where: { stripeSubscriptionId: TEST_SUB_ID },
            data: { amount: 20000 }
        });

        movements = await db.mrrMovement.findMany({
            where: { customerId: customer.id },
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        console.log("Movement:", movements[0]?.movementType, movements[0]?.mrrAmount);


        // Scenario 3: Downgrade ($50/mo)
        console.log("\n--- Scenario 3: Downgrade ($50) ---");
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: TEST_SUB_ID,
            stripeCustomerId: TEST_CUSTOMER_ID,
            status: "active",
            amount: 5000,
            interval: "month"
        });

        // Update subscription
        await db.subscription.update({
            where: { stripeSubscriptionId: TEST_SUB_ID },
            data: { amount: 5000 }
        });

        movements = await db.mrrMovement.findMany({
            where: { customerId: customer.id },
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        console.log("Movement:", movements[0]?.movementType, movements[0]?.mrrAmount);


        // Scenario 4: Churn (Cancel)
        console.log("\n--- Scenario 4: Churn ---");
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: TEST_SUB_ID,
            stripeCustomerId: TEST_CUSTOMER_ID,
            status: "canceled",
            amount: 5000, // Amount doesn't matter if status is canceled, logic should handle it
            interval: "month"
        });

        // Update subscription
        await db.subscription.update({
            where: { stripeSubscriptionId: TEST_SUB_ID },
            data: { status: "canceled" }
        });

        movements = await db.mrrMovement.findMany({
            where: { customerId: customer.id },
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        console.log("Movement:", movements[0]?.movementType, movements[0]?.mrrAmount);

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
