import { db } from "@/server/db/client";

export class SnapshotService {
    /**
     * Creates a daily snapshot of the pipeline metrics.
     * Should be called by a cron job daily.
     */
    static async createPipelineSnapshot() {
        // Get all organizations
        const organizations = await db.organization.findMany({
            select: { id: true },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const org of organizations) {
            // Calculate metrics for this org
            const deals = await db.deal.findMany({
                where: {
                    organizationId: org.id,
                    isClosed: false, // Open deals only
                },
                select: {
                    amount: true,
                    probability: true,
                },
            });

            let totalValue = 0;
            let weightedValue = 0;

            for (const deal of deals) {
                const amount = deal.amount || 0;
                const probability = deal.probability || 10; // Default 10%

                totalValue += amount;
                weightedValue += amount * (probability / 100);
            }

            // Store snapshot
            await db.pipelineSnapshot.upsert({
                where: {
                    organizationId_snapshotDate: {
                        organizationId: org.id,
                        snapshotDate: today,
                    },
                },
                update: {
                    totalValue,
                    weightedValue: Math.round(weightedValue),
                    dealCount: deals.length,
                },
                create: {
                    organizationId: org.id,
                    snapshotDate: today,
                    totalValue,
                    weightedValue: Math.round(weightedValue),
                    dealCount: deals.length,
                },
            });
        }
    }
}
