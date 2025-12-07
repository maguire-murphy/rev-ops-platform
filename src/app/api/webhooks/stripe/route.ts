import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/server/integrations/stripe";
import { db } from "@/server/db/client";
import { MrrService } from "@/server/services/mrr-service";
import crypto from "crypto";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    try {
        switch (event.type) {
            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                const subscription = event.data.object as Stripe.Subscription;

                // 1. Sync Customer (ensure it exists)
                // We need to find the organization first. 
                // Ideally, we store the org ID in Stripe metadata.
                // For this MVP, we'll try to find an existing customer or use a default org if testing.
                const stripeCustomerId = subscription.customer as string;

                // Try to find existing customer
                let customer = await db.customer.findFirst({
                    where: { stripeCustomerId }
                });

                if (!customer) {
                    // If not found, we need to create one.
                    // In a real app, we'd fetch the customer from Stripe to get email/name
                    // and try to match with a user or use metadata.
                    // For MVP, we'll assume it belongs to the default org if not found.
                    // TODO: Fetch customer details from Stripe

                    // Use the default org ID we fixed earlier
                    const DEFAULT_ORG_ID = "00000000-0000-0000-0000-000000000000";

                    customer = await db.customer.create({
                        data: {
                            organizationId: DEFAULT_ORG_ID,
                            stripeCustomerId,
                            name: "Stripe Customer", // Placeholder
                        }
                    });
                }

                // 2. Calculate MRR Movement (BEFORE updating subscription)
                // We need to pass the NEW state from the webhook
                const subAny = subscription as any;
                const items = subAny.items.data;
                const price = items[0]?.price;
                const amount = price?.unit_amount || 0;
                const interval = price?.recurring?.interval || "month";
                const intervalCount = price?.recurring?.interval_count || 1;

                await MrrService.handleSubscriptionChange({
                    stripeSubscriptionId: subAny.id,
                    stripeCustomerId,
                    status: subAny.status,
                    amount,
                    interval,
                    intervalCount,
                    effectiveDate: new Date(subAny.current_period_start * 1000),
                });

                // 3. Sync Subscription (Update/Create)
                await db.subscription.upsert({
                    where: { stripeSubscriptionId: subAny.id } as any,
                    create: {
                        id: crypto.randomUUID(),
                        organizationId: customer.organizationId,
                        customerId: customer.id,
                        stripeSubscriptionId: subAny.id,
                        stripePriceId: price?.id,
                        status: subAny.status,
                        amount,
                        currency: price?.currency,
                        billingInterval: interval,
                        billingIntervalCount: intervalCount,
                        currentPeriodStart: new Date(subAny.current_period_start * 1000),
                        currentPeriodEnd: new Date(subAny.current_period_end * 1000),
                        startedAt: new Date(subAny.start_date * 1000),
                    },
                    update: {
                        status: subAny.status,
                        amount,
                        billingInterval: interval,
                        billingIntervalCount: intervalCount,
                        currentPeriodStart: new Date(subAny.current_period_start * 1000),
                        currentPeriodEnd: new Date(subAny.current_period_end * 1000),
                    }
                });

                console.log(`Processed subscription event: ${event.type}`, subscription.id);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new NextResponse("Webhook handler failed", { status: 500 });
    }

    return new NextResponse(null, { status: 200 });
}
