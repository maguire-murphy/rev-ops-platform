import { db } from "../src/server/db/client";
import { CohortService } from "../src/server/services/cohort-service";
import "dotenv/config";

async function main() {
    const newOrg = await db.organization.create({
        data: {
            name: "Cohort Test Org",
            slug: "cohort-test-" + Date.now(),
        }
    });
    const orgId = newOrg.id;
    console.log(`Created test org: ${orgId}`);

    // Helper to create date
    const getDate = (monthOffset: number) => {
        const d = new Date();
        d.setMonth(d.getMonth() - 5 + monthOffset); // Start 5 months ago
        d.setDate(1);
        return d;
    };

    // Cohort 1: Joined 5 months ago (Month 0)
    // Customer A: $100 -> Churn at Month 2
    // Customer B: $100 -> Expand to $150 at Month 1 -> Active

    const dateM0 = getDate(0);
    const dateM1 = getDate(1);
    const dateM2 = getDate(2);

    // Create Customer A
    const custA = await db.customer.create({
        data: { organizationId: orgId, name: "Customer A" }
    });
    const subA = await db.subscription.create({
        data: {
            organizationId: orgId,
            customerId: custA.id,
            status: "canceled",
            amount: 10000,
            stripeSubscriptionId: "sub_A",
        }
    });
    // Movements for A
    await db.mrrMovement.createMany({
        data: [
            {
                organizationId: orgId,
                customerId: custA.id,
                subscriptionId: subA.id,
                movementType: "new",
                mrrAmount: 10000,
                newMrr: 10000,
                previousMrr: 0,
                effectiveDate: dateM0,
            },
            {
                organizationId: orgId,
                customerId: custA.id,
                subscriptionId: subA.id,
                movementType: "churn",
                mrrAmount: 10000,
                newMrr: 0,
                previousMrr: 10000,
                effectiveDate: dateM2,
            }
        ]
    });

    // Create Customer B
    const custB = await db.customer.create({
        data: { organizationId: orgId, name: "Customer B" }
    });
    const subB = await db.subscription.create({
        data: {
            organizationId: orgId,
            customerId: custB.id,
            status: "active",
            amount: 15000,
            stripeSubscriptionId: "sub_B",
        }
    });
    // Movements for B
    await db.mrrMovement.createMany({
        data: [
            {
                organizationId: orgId,
                customerId: custB.id,
                subscriptionId: subB.id,
                movementType: "new",
                mrrAmount: 10000,
                newMrr: 10000,
                previousMrr: 0,
                effectiveDate: dateM0,
            },
            {
                organizationId: orgId,
                customerId: custB.id,
                subscriptionId: subB.id,
                movementType: "expansion",
                mrrAmount: 5000,
                newMrr: 15000,
                previousMrr: 10000,
                effectiveDate: dateM1,
            }
        ]
    });

    // Cohort 2: Joined 4 months ago (Month 1 relative to start, but Month 0 for this cohort)
    // Customer C: $100 -> Active
    const custC = await db.customer.create({
        data: { organizationId: orgId, name: "Customer C" }
    });
    const subC = await db.subscription.create({
        data: {
            organizationId: orgId,
            customerId: custC.id,
            status: "active",
            amount: 10000,
            stripeSubscriptionId: "sub_C",
        }
    });
    await db.mrrMovement.create({
        data: {
            organizationId: orgId,
            customerId: custC.id,
            subscriptionId: subC.id,
            movementType: "new",
            mrrAmount: 10000,
            newMrr: 10000,
            previousMrr: 0,
            effectiveDate: dateM1,
        }
    });

    console.log("Data seeded. Running analysis...");

    const revenueCohorts = await CohortService.getRevenueCohorts(orgId);
    console.log("Revenue Cohorts:", JSON.stringify(revenueCohorts, null, 2));

    // Verification
    // Cohort 1 (dateM0):
    // M0: A(100) + B(100) = 200
    // M1: A(100) + B(150) = 250
    // M2: A(0) + B(150) = 150

    // Cohort 2 (dateM1):
    // M0: C(100) = 100
    // M1: C(100) = 100

    const c1 = revenueCohorts.find(c => c.cohort === dateM0.toISOString().slice(0, 7));
    if (c1) {
        if (c1.months[0] === 20000 && c1.months[1] === 25000 && c1.months[2] === 15000) {
            console.log("SUCCESS: Cohort 1 Revenue matches.");
        } else {
            console.error("FAILURE: Cohort 1 Revenue mismatch.");
        }
    } else {
        console.error("FAILURE: Cohort 1 not found.");
    }

    const c2 = revenueCohorts.find(c => c.cohort === dateM1.toISOString().slice(0, 7));
    if (c2) {
        if (c2.months[0] === 10000 && c2.months[1] === 10000) {
            console.log("SUCCESS: Cohort 2 Revenue matches.");
        } else {
            console.error("FAILURE: Cohort 2 Revenue mismatch.");
        }
    } else {
        console.error("FAILURE: Cohort 2 not found.");
    }

    // Cleanup
    await db.mrrMovement.deleteMany({ where: { organizationId: orgId } });
    await db.subscription.deleteMany({ where: { organizationId: orgId } });
    await db.customer.deleteMany({ where: { organizationId: orgId } });
    await db.organization.delete({ where: { id: orgId } });
    console.log("Cleanup complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
