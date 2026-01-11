import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const db = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
});

async function main() {
    console.log("Starting Webhook Test...");

    // 1. Create a test customer in Stripe (or use existing)
    // We need a real customer ID for the webhook to be valid if we were validating signatures strictly,
    // but since we are mocking the request to our local endpoint, we can construct the payload manually.
    // However, the handler verifies the signature using the real Stripe SDK.
    // So we need to generate a valid signature or bypass signature verification for testing.
    // Bypassing is hard without changing code.
    // Easier approach: Use `stripe trigger` CLI command if available, OR
    // construct a real event using the Stripe SDK and send it.
    // BUT, the Stripe SDK `constructEvent` requires a raw body and a signature signed with the secret.
    // We can't easily sign it ourselves without the secret (which we have).

    // ALTERNATIVE: Use the `stripe trigger` command via `run_command`?
    // The user has `stripe listen` running.
    // Let's try to use `stripe trigger` if possible.
    // But we want to verify the DB state after.

    // Let's try to construct a payload and sign it manually?
    // Actually, for this test script, let's just use `fetch` to hit the endpoint
    // and we might need to temporarily disable signature verification or use a test secret.

    // WAIT. The user has `stripe listen` running forwarding to localhost:3000.
    // So if I trigger an event in Stripe (via API), it should hit the local webhook.

    const TEST_ORG_ID = "00000000-0000-0000-0000-000000000000";

    // Get integration
    const integration = await db.integration.findFirst({
        where: { organizationId: TEST_ORG_ID, provider: "stripe" }
    });

    if (!integration?.stripeAccountId) throw new Error("No integration");

    console.log("Creating subscription in Stripe to trigger webhook...");

    // Create Customer
    const customer = await stripe.customers.create({
        email: `webhook_test_${Date.now()}@example.com`,
        name: "Webhook Test Customer",
    }, { stripeAccount: integration.stripeAccountId });

    // Attach Payment Method
    const paymentMethod = await stripe.paymentMethods.attach(
        'pm_card_visa',
        { customer: customer.id },
        { stripeAccount: integration.stripeAccountId }
    );

    await stripe.customers.update(
        customer.id,
        { invoice_settings: { default_payment_method: paymentMethod.id } },
        { stripeAccount: integration.stripeAccountId }
    );

    // Create Price
    const price = await stripe.prices.create({
        unit_amount: 7500,
        currency: 'usd',
        recurring: { interval: 'month' },
        product_data: { name: 'Webhook Test Product' },
    }, { stripeAccount: integration.stripeAccountId });

    // Create Subscription
    const sub = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
    }, { stripeAccount: integration.stripeAccountId });

    console.log(`Created subscription ${sub.id}. Waiting for webhook...`);

    // Wait for webhook to process
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Check DB
    const dbSub = await db.subscription.findFirst({
        where: { stripeSubscriptionId: sub.id }
    });

    if (dbSub) {
        console.log("SUCCESS: Subscription found in DB:", dbSub.id);

        // Check MRR Movement
        const movement = await db.mrrMovement.findFirst({
            where: { subscriptionId: dbSub.id }
        });

        if (movement) {
            console.log("SUCCESS: MRR Movement found:", movement.type, movement.amount);
        } else {
            console.error("FAILURE: MRR Movement not found");
        }
    } else {
        console.error("FAILURE: Subscription not found in DB");
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await db.$disconnect();
    });
