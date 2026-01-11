import { db } from "../src/server/db/client";
import "dotenv/config";

async function main() {
    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";

    // Ensure Org
    const org = await db.organization.upsert({
        where: { id: TEST_ORG_ID },
        update: {},
        create: {
            id: TEST_ORG_ID,
            name: "Test Organization",
            slug: "test-org",
        },
    });

    console.log("Organization ensured:", org.id);

    // Create Active Customer
    const activeCustomer = await db.customer.create({
        data: {
            organizationId: TEST_ORG_ID,
            name: "Active Corp",
            email: "billing@active.com",
            stripeCustomerId: "cus_active123",
            subscriptions: {
                create: {
                    organizationId: TEST_ORG_ID,
                    stripeSubscriptionId: "sub_active123",
                    status: "active",
                    planName: "Growth Plan",
                    billingInterval: "month",
                    amount: 29900,
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            },
            mrrMovements: {
                create: {
                    organizationId: TEST_ORG_ID,
                    movementType: "new",
                    mrrAmount: 29900,
                    newMrr: 29900,
                    effectiveDate: new Date(),
                },
            },
        },
    });
    console.log("Created Active Customer:", activeCustomer.name);

    // Create At-Risk Customer (Past Due)
    const atRiskCustomer = await db.customer.create({
        data: {
            organizationId: TEST_ORG_ID,
            name: "Risky Business Ltd",
            email: "finance@risky.com",
            stripeCustomerId: "cus_risky123",
            subscriptions: {
                create: {
                    organizationId: TEST_ORG_ID,
                    stripeSubscriptionId: "sub_risky123",
                    status: "past_due",
                    planName: "Enterprise Plan",
                    billingInterval: "month",
                    amount: 99900,
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            },
            mrrMovements: {
                create: {
                    organizationId: TEST_ORG_ID,
                    movementType: "new",
                    mrrAmount: 99900,
                    newMrr: 99900,
                    effectiveDate: new Date(),
                },
            },
        },
    });
    console.log("Created At-Risk Customer:", atRiskCustomer.name);

    // Create Churned Customer
    const churnedCustomer = await db.customer.create({
        data: {
            organizationId: TEST_ORG_ID,
            name: "Churned Co",
            email: "bye@churned.com",
            stripeCustomerId: "cus_churned123",
            subscriptions: {
                create: {
                    organizationId: TEST_ORG_ID,
                    stripeSubscriptionId: "sub_churned123",
                    status: "canceled",
                    planName: "Starter Plan",
                    billingInterval: "month",
                    amount: 9900,
                    canceledAt: new Date(),
                },
            },
            mrrMovements: {
                createMany: {
                    data: [
                        {
                            organizationId: TEST_ORG_ID,
                            movementType: "new",
                            mrrAmount: 9900,
                            newMrr: 9900,
                            effectiveDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                        },
                        {
                            organizationId: TEST_ORG_ID,
                            movementType: "churn",
                            mrrAmount: -9900,
                            newMrr: 0,
                            effectiveDate: new Date(),
                        },
                    ],
                },
            },
        },
    });
    console.log("Created Churned Customer:", churnedCustomer.name);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
