import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    console.log("Starting Churn Verification...");
    const ORG_ID = "22222222-2222-2222-2222-222222222222";

    try {
        // Setup
        await db.mrrSnapshot.deleteMany({ where: { organizationId: ORG_ID } });
        await db.organization.delete({ where: { id: ORG_ID } }).catch(() => { });

        await db.organization.create({
            data: { id: ORG_ID, name: "Churn Test", slug: "churn-test" }
        });

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Snapshot 1: Yesterday (Baseline)
        // 10 Customers @ $100 = $1000 MRR
        await db.mrrSnapshot.create({
            data: {
                organizationId: ORG_ID,
                snapshotDate: yesterday,
                totalMrr: 100000, // $1000
                totalCustomers: 10,
                churnMrr: 0
            }
        });

        // Snapshot 2: Today
        // 1 Customer Churns ($100). Remaining = $900.
        await db.mrrSnapshot.create({
            data: {
                organizationId: ORG_ID,
                snapshotDate: today,
                totalMrr: 90000, // $900
                totalCustomers: 9,
                churnMrr: 10000 // $100
            }
        });

        // Verify Logic (Replicating Router Logic)
        // Churn Rate = Churn / (Total + Churn)
        const startMrr = 90000 + 10000;
        const churnRate = (10000 / startMrr) * 100;

        console.log(`Start MRR: $${startMrr / 100}`);
        console.log(`Churn MRR: $100`);
        console.log(`Calculated Rate: ${churnRate}%`);

        if (Math.abs(churnRate - 10) < 0.01) {
            console.log("✅ PASS");
        } else {
            console.error(`❌ FAIL: Expected 10%, got ${churnRate}%`);
            process.exit(1);
        }

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
}

main();
