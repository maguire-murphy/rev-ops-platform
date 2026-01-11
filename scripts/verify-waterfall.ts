import { PrismaClient } from "@prisma/client";
import { MrrService } from "../src/server/services/mrr-service";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
    console.log("Starting Waterfall Verification...");
    const ORG_ID = "11111111-1111-1111-1111-111111111111";

    try {
        // Setup
        await db.mrrMovement.deleteMany({ where: { organizationId: ORG_ID } });
        await db.subscription.deleteMany({ where: { organizationId: ORG_ID } });
        await db.customer.deleteMany({ where: { organizationId: ORG_ID } });
        await db.organization.delete({ where: { id: ORG_ID } }).catch(() => { });

        await db.organization.create({
            data: { id: ORG_ID, name: "Waterfall Test", slug: "waterfall-test" }
        });

        const custA = await db.customer.create({ data: { organizationId: ORG_ID, stripeCustomerId: "cus_A", name: "A" } });
        const custB = await db.customer.create({ data: { organizationId: ORG_ID, stripeCustomerId: "cus_B", name: "B" } });
        const custC = await db.customer.create({ data: { organizationId: ORG_ID, stripeCustomerId: "cus_C", name: "C" } });

        const month1 = new Date("2024-01-01");
        const month2 = new Date("2024-02-01");

        // Month 1: New Business
        console.log("Simulating Month 1...");
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: "sub_A", stripeCustomerId: "cus_A", status: "active", amount: 10000, interval: "month", effectiveDate: month1
        });
        await db.subscription.create({ data: { organizationId: ORG_ID, customerId: custA.id, stripeSubscriptionId: "sub_A", status: "active", amount: 10000, billingInterval: "month", startedAt: month1 } });

        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: "sub_B", stripeCustomerId: "cus_B", status: "active", amount: 20000, interval: "month", effectiveDate: month1
        });
        await db.subscription.create({ data: { organizationId: ORG_ID, customerId: custB.id, stripeSubscriptionId: "sub_B", status: "active", amount: 20000, billingInterval: "month", startedAt: month1 } });

        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: "sub_C", stripeCustomerId: "cus_C", status: "active", amount: 10000, interval: "month", effectiveDate: month1
        });
        await db.subscription.create({ data: { organizationId: ORG_ID, customerId: custC.id, stripeSubscriptionId: "sub_C", status: "active", amount: 10000, billingInterval: "month", startedAt: month1 } });

        // Month 2: Expansion & Churn
        console.log("Simulating Month 2...");
        // B Expands to 300
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: "sub_B", stripeCustomerId: "cus_B", status: "active", amount: 30000, interval: "month", effectiveDate: month2
        });
        await db.subscription.update({ where: { stripeSubscriptionId: "sub_B" }, data: { amount: 30000 } });

        // C Churns
        await MrrService.handleSubscriptionChange({
            stripeSubscriptionId: "sub_C", stripeCustomerId: "cus_C", status: "canceled", amount: 10000, interval: "month", effectiveDate: month2
        });
        await db.subscription.update({ where: { stripeSubscriptionId: "sub_C" }, data: { status: "canceled" } });

        // Verify
        const movements = await db.mrrMovement.findMany({ where: { organizationId: ORG_ID } });

        const m1New = movements.filter(m => m.effectiveDate.getTime() === month1.getTime() && m.movementType === "new")
            .reduce((sum, m) => sum + m.mrrAmount, 0);

        const m2Exp = movements.filter(m => m.effectiveDate.getTime() === month2.getTime() && m.movementType === "expansion")
            .reduce((sum, m) => sum + m.mrrAmount, 0);

        const m2Churn = movements.filter(m => m.effectiveDate.getTime() === month2.getTime() && m.movementType === "churn")
            .reduce((sum, m) => sum + m.mrrAmount, 0);

        console.log("Results:");
        console.log(`Month 1 New MRR: $${m1New / 100} (Expected $400)`);
        console.log(`Month 2 Expansion: $${m2Exp / 100} (Expected $100)`);
        console.log(`Month 2 Churn: $${m2Churn / 100} (Expected $100)`);

        if (m1New === 40000 && m2Exp === 10000 && m2Churn === 10000) {
            console.log("✅ PASS");
        } else {
            console.error("❌ FAIL");
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
