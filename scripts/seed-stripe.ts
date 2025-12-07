import "dotenv/config";
import { stripe } from "../src/server/integrations/stripe";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";
    const integration = await db.integration.findFirst({
        where: { organizationId: TEST_ORG_ID, provider: "stripe" }
    });

    if (!integration?.stripeAccountId) throw new Error("No integration");

    console.log("Seeding Stripe account:", integration.stripeAccountId);

    // Create Customer
    const customer = await stripe.customers.create({
        email: `seed_${Date.now()}@example.com`,
        name: "Seed Customer",
    }, { stripeAccount: integration.stripeAccountId });

    console.log("Created Customer:", customer.id);

    // Attach Payment Method
    const paymentMethod = await stripe.paymentMethods.attach(
        'pm_card_visa',
        { customer: customer.id },
        { stripeAccount: integration.stripeAccountId }
    );

    // Set as default
    await stripe.customers.update(
        customer.id,
        { invoice_settings: { default_payment_method: paymentMethod.id } },
        { stripeAccount: integration.stripeAccountId }
    );

    // Create Price
    const price = await stripe.prices.create({
        unit_amount: 5000,
        currency: 'usd',
        recurring: { interval: 'month' },
        product_data: { name: 'Seed Product' },
    }, { stripeAccount: integration.stripeAccountId });

    // Create Subscription
    const sub = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
    }, { stripeAccount: integration.stripeAccountId });

    console.log("Created Subscription:", sub.id);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await db.$disconnect();
    });
