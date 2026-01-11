import { db } from "@/server/db/client";
import { stripe } from "@/server/integrations/stripe";
import { MrrService } from "@/server/services/mrr-service";
import crypto from "crypto";

export class StripeSyncService {
    static async syncOrganization(organizationId: string) {
        // 1. Get Integration Credentials
        const integration = await db.integration.findFirst({
            where: {
                organizationId,
                provider: "stripe",
                status: "active",
            },
        });

        if (!integration || !integration.stripeAccountId) {
            throw new Error("Stripe integration not found or inactive");
        }

        const stripeAccountId = integration.stripeAccountId;
        console.log(`Syncing Stripe for org ${organizationId} (Account: ${stripeAccountId})`);

        // 2. Sync Customers
        // In a real app, handle pagination. For MVP, fetch top 100.
        const customers = await stripe.customers.list({
            limit: 100,
        }, {
            stripeAccount: stripeAccountId,
        });

        console.log(`Found ${customers.data.length} customers`);

        for (const stripeCustomer of customers.data) {
            await db.customer.upsert({
                where: {
                    organizationId_stripeCustomerId: {
                        organizationId,
                        stripeCustomerId: stripeCustomer.id,
                    }
                },
                create: {
                    organizationId,
                    stripeCustomerId: stripeCustomer.id,
                    email: stripeCustomer.email,
                    name: stripeCustomer.name,
                },
                update: {
                    email: stripeCustomer.email,
                    name: stripeCustomer.name,
                }
            });
        }

        // 3. Sync Subscriptions
        const subscriptions = await stripe.subscriptions.list({
            limit: 100,
            status: 'all',
            expand: ['data.items.data.price'],
        }, {
            stripeAccount: stripeAccountId,
        });

        console.log(`Found ${subscriptions.data.length} subscriptions`);

        for (const sub of subscriptions.data) {
            const customer = await db.customer.findFirst({
                where: {
                    organizationId,
                    stripeCustomerId: sub.customer as string,
                }
            });

            if (!customer) continue;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const subAny = sub as any;
            const items = subAny.items.data;
            const firstItem = items[0];
            const price = firstItem?.price;
            const quantity = firstItem?.quantity || 1; // Get quantity (seats)
            const unitAmount = price?.unit_amount || 0;
            const amount = unitAmount * quantity; // Total amount = unit price × quantity
            const interval = price?.recurring?.interval || "month";
            const intervalCount = price?.recurring?.interval_count || 1;

            // Check if subscription exists
            const existingSub = await db.subscription.findFirst({
                where: { stripeSubscriptionId: subAny.id }
            });

            const startedAt = subAny.start_date ? new Date(subAny.start_date * 1000) : new Date();

            // For new subscriptions (backfill), use the start date.
            // For existing subscriptions (updates), use today.
            const effectiveDate = existingSub ? new Date() : startedAt;

            // Calculate MRR movement BEFORE updating the subscription in DB
            // This ensures we detect "New" subscriptions (not in DB yet) correctly
            if (["active", "past_due"].includes(subAny.status)) {
                await MrrService.handleSubscriptionChange({
                    stripeSubscriptionId: subAny.id,
                    stripeCustomerId: subAny.customer as string,
                    status: subAny.status,
                    amount,
                    interval,
                    intervalCount,
                    effectiveDate: effectiveDate,
                });
            }

            const currentPeriodStart = subAny.current_period_start ? new Date(subAny.current_period_start * 1000) : new Date();
            const currentPeriodEnd = subAny.current_period_end ? new Date(subAny.current_period_end * 1000) : new Date();

            const subData = {
                status: subAny.status,
                amount,
                billingInterval: interval,
                billingIntervalCount: intervalCount,
                currentPeriodStart,
                currentPeriodEnd,
            };

            if (existingSub) {
                await db.subscription.update({
                    where: { id: existingSub.id },
                    data: subData,
                });
            } else {
                const createData = {
                    id: crypto.randomUUID(),
                    organizationId,
                    customerId: customer.id,
                    stripeSubscriptionId: subAny.id,
                    stripePriceId: price?.id,
                    currency: price?.currency,
                    startedAt,
                    ...subData
                };

                await db.subscription.create({
                    data: createData,
                });
            }
        }

        // Update last sync time
        await db.integration.update({
            where: { id: integration.id },
            data: { lastSyncAt: new Date() }
        });

        return {
            customers: customers.data.length,
            subscriptions: subscriptions.data.length,
        };
    }
}
