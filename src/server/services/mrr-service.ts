import { db } from "@/server/db/client";

export class MrrService {
    /**
     * Calculates the monthly recurring revenue (MRR) in cents.
     */
    private static calculateMrr(amount: number, interval: string, intervalCount: number = 1): number {
        if (interval === "month") {
            return Math.round(amount / intervalCount);
        } else if (interval === "year") {
            return Math.round(amount / 12 / intervalCount);
        }
        return 0;
    }

    /**
     * Handles a subscription change event and records the appropriate MRR movement.
     */
    static async handleSubscriptionChange(data: {
        stripeSubscriptionId: string;
        stripeCustomerId: string;
        status: string;
        amount: number; // in cents
        interval: string;
        intervalCount?: number;
        effectiveDate?: Date;
    }) {
        const {
            stripeSubscriptionId,
            stripeCustomerId,
            status,
            amount,
            interval,
            intervalCount = 1,
            effectiveDate = new Date(),
        } = data;

        // 1. Find Customer and Organization
        const customer = await db.customer.findFirst({
            where: { stripeCustomerId },
            include: { organization: true },
        });

        if (!customer) {
            console.warn(`MRR Service: Customer not found for stripeCustomerId: ${stripeCustomerId}`);
            return;
        }

        const organizationId = customer.organizationId;

        // 2. Calculate New MRR
        let newMrr = 0;
        if (["active", "past_due"].includes(status)) {
            newMrr = this.calculateMrr(amount, interval, intervalCount);
        }

        // 3. Fetch Previous Subscription State
        const currentSubscription = await db.subscription.findFirst({
            where: { stripeSubscriptionId },
        });

        let previousMrr = 0;
        if (currentSubscription) {
            // Recalculate previous MRR based on stored values to be safe
            // (Assuming we store amount/interval in Subscription)
            previousMrr = this.calculateMrr(
                currentSubscription.amount,
                currentSubscription.billingInterval || "month",
                currentSubscription.billingIntervalCount || 1
            );
        }

        // 4. Determine Movement Type
        const mrrDelta = newMrr - previousMrr;
        let movementType = "";

        if (previousMrr === 0 && newMrr > 0) {
            movementType = "new"; // Or 'reactivation' if we tracked churn history
        } else if (newMrr > previousMrr) {
            movementType = "expansion";
        } else if (newMrr < previousMrr && newMrr > 0) {
            movementType = "contraction";
        } else if (newMrr === 0 && previousMrr > 0) {
            movementType = "churn";
        }

        // 5. Record Movement (if there is a change)
        if (movementType && mrrDelta !== 0) {
            await db.mrrMovement.create({
                data: {
                    organizationId,
                    customerId: customer.id,
                    subscriptionId: currentSubscription?.id, // Might be null if new, but we usually create sub first? 
                    // Actually, we should probably ensure the subscription exists or at least link it if possible.
                    // For 'new', the subscription record might not exist yet if we run this BEFORE creating it.
                    // Strategy: Run this AFTER creating/updating the subscription? 
                    // If we run AFTER, 'currentSubscription' will be the NEW state.
                    // So we must rely on 'previous_attributes' from Stripe webhook or store 'previousMrr' before update.

                    // REVISED STRATEGY: 
                    // We will assume this service is called *before* the local DB update, OR we pass 'previousMrr' explicitly.
                    // But for now, let's assume we fetch the *existing* record which represents the *old* state.

                    movementType,
                    mrrAmount: Math.abs(mrrDelta),
                    previousMrr,
                    newMrr,
                    effectiveDate,
                },
            });
            console.log(`MRR Movement recorded: ${movementType} (${mrrDelta}) for ${stripeSubscriptionId}`);
        } else {
            console.log(`No MRR change for ${stripeSubscriptionId} (Delta: ${mrrDelta})`);
        }
    }

    /**
     * Creates a daily MRR snapshot for a specific organization.
     */
    static async createDailySnapshot(organizationId: string) {
        // 1. Calculate Total Active MRR
        // We sum the MRR of all active subscriptions for this organization.
        // Note: We need to calculate MRR for each subscription dynamically or store it.
        // For efficiency, we'll calculate it on the fly here, but in a large app, we'd store 'mrr' on Subscription.

        const activeSubscriptions = await db.subscription.findMany({
            where: {
                organizationId,
                status: { in: ["active", "past_due"] }, // Include past_due as active revenue usually
            },
        });

        let totalMrr = 0;
        for (const sub of activeSubscriptions) {
            totalMrr += this.calculateMrr(
                sub.amount,
                sub.billingInterval || "month",
                sub.billingIntervalCount || 1
            );
        }

        // 2. Create Snapshot Record
        await db.mrrSnapshot.create({
            data: {
                organizationId,
                totalMrr,
                snapshotDate: new Date(), // Defaults to now
            },
        });

        console.log(`Created MRR Snapshot for org ${organizationId}: ${totalMrr}`);
        return totalMrr;
    }
}
