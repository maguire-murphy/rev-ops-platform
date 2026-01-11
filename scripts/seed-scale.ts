import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
    console.log("Starting Scale Seeding (10k subs)...");
    const ORG_ID = "33333333-3333-3333-3333-333333333333";

    try {
        // Cleanup
        console.log("Cleaning up old data...");
        await db.subscription.deleteMany({ where: { organizationId: ORG_ID } });
        await db.customer.deleteMany({ where: { organizationId: ORG_ID } });
        await db.organization.delete({ where: { id: ORG_ID } }).catch(() => { });

        // Create Org
        await db.organization.create({
            data: { id: ORG_ID, name: "Scale Test", slug: "scale-test" }
        });

        console.log("Generating data...");
        const customers = [];
        const subscriptions = [];
        const BATCH_SIZE = 1000;
        const TOTAL = 10000;

        for (let i = 0; i < TOTAL; i++) {
            const custId = crypto.randomUUID();
            customers.push({
                id: custId,
                organizationId: ORG_ID,
                name: `Customer ${i}`,
                stripeCustomerId: `cus_scale_${i}`
            });

            subscriptions.push({
                id: crypto.randomUUID(),
                organizationId: ORG_ID,
                customerId: custId,
                stripeSubscriptionId: `sub_scale_${i}`,
                status: "active",
                amount: 5000, // $50
                billingInterval: "month",
                billingIntervalCount: 1,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(),
                startedAt: new Date(),
                planName: i % 2 === 0 ? "Pro Plan" : "Basic Plan"
            });
        }

        console.log("Inserting Customers...");
        for (let i = 0; i < customers.length; i += BATCH_SIZE) {
            await db.customer.createMany({
                data: customers.slice(i, i + BATCH_SIZE)
            });
            console.log(`Inserted ${Math.min(i + BATCH_SIZE, customers.length)} customers`);
        }

        console.log("Inserting Subscriptions...");
        for (let i = 0; i < subscriptions.length; i += BATCH_SIZE) {
            await db.subscription.createMany({
                data: subscriptions.slice(i, i + BATCH_SIZE)
            });
            console.log(`Inserted ${Math.min(i + BATCH_SIZE, subscriptions.length)} subscriptions`);
        }

        console.log("✅ Seeding Complete");

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
}

main();
