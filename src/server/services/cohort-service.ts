import { db } from "@/server/db/client";

interface CohortData {
    cohort: string; // "YYYY-MM"
    initialSize: number; // Initial MRR or Customer Count
    months: number[]; // [Month 0 value, Month 1 value, ...]
}

export class CohortService {
    /**
     * Helper to format date as YYYY-MM
     */
    private static getMonthKey(date: Date): string {
        return date.toISOString().slice(0, 7);
    }

    /**
     * Helper to get the last day of a month
     */
    private static getLastDayOfMonth(year: number, month: number): Date {
        return new Date(year, month + 1, 0);
    }

    /**
     * Calculates Revenue Retention Cohorts
     */
    static async getRevenueCohorts(organizationId: string): Promise<CohortData[]> {
        // 1. Identify Cohorts (Customers grouped by first "new" movement date)
        const customers = await db.customer.findMany({
            where: { organizationId },
            include: {
                mrrMovements: {
                    where: { movementType: "new" },
                    orderBy: { effectiveDate: "asc" },
                    take: 1,
                },
            },
        });

        // Map customerId -> Cohort Month (YYYY-MM)
        const customerCohorts = new Map<string, string>();
        const cohortCustomers = new Map<string, string[]>();

        for (const customer of customers) {
            if (customer.mrrMovements.length > 0) {
                const joinDate = customer.mrrMovements[0].effectiveDate;
                const cohortKey = this.getMonthKey(joinDate);

                customerCohorts.set(customer.id, cohortKey);

                if (!cohortCustomers.has(cohortKey)) {
                    cohortCustomers.set(cohortKey, []);
                }
                cohortCustomers.get(cohortKey)?.push(customer.id);
            }
        }

        // 2. Calculate Retention for each Cohort
        const cohorts: CohortData[] = [];
        const sortedCohortKeys = Array.from(cohortCustomers.keys()).sort();

        // We'll analyze the last 12 cohorts
        const recentCohorts = sortedCohortKeys.slice(-12);

        for (const cohortKey of recentCohorts) {
            const customerIds = cohortCustomers.get(cohortKey) || [];
            const [year, month] = cohortKey.split("-").map(Number);

            const monthValues: number[] = [];

            // Calculate for Month 0 to Month 11 (or up to present)
            for (let i = 0; i < 12; i++) {
                const targetDate = this.getLastDayOfMonth(year, month - 1 + i);

                // Don't project into the future
                if (targetDate > new Date()) break;

                // Calculate Total MRR for these customers at targetDate
                let totalMrr = 0;

                // Optimization: We could batch this, but for MVP loop is fine
                for (const customerId of customerIds) {
                    totalMrr += await this.getCustomerMrrAtDate(customerId, targetDate);
                }

                monthValues.push(totalMrr);
            }

            cohorts.push({
                cohort: cohortKey,
                initialSize: monthValues[0] || 0, // Month 0 MRR
                months: monthValues,
            });
        }

        return cohorts;
    }

    /**
     * Calculates Customer Retention Cohorts
     */
    static async getCustomerCohorts(organizationId: string): Promise<CohortData[]> {
        // 1. Identify Cohorts (Same as above)
        const customers = await db.customer.findMany({
            where: { organizationId },
            include: {
                mrrMovements: {
                    where: { movementType: "new" },
                    orderBy: { effectiveDate: "asc" },
                    take: 1,
                },
            },
        });

        const cohortCustomers = new Map<string, string[]>();

        for (const customer of customers) {
            if (customer.mrrMovements.length > 0) {
                const joinDate = customer.mrrMovements[0].effectiveDate;
                const cohortKey = this.getMonthKey(joinDate);

                if (!cohortCustomers.has(cohortKey)) {
                    cohortCustomers.set(cohortKey, []);
                }
                cohortCustomers.get(cohortKey)?.push(customer.id);
            }
        }

        // 2. Calculate Retention
        const cohorts: CohortData[] = [];
        const sortedCohortKeys = Array.from(cohortCustomers.keys()).sort();
        const recentCohorts = sortedCohortKeys.slice(-12);

        for (const cohortKey of recentCohorts) {
            const customerIds = cohortCustomers.get(cohortKey) || [];
            const [year, month] = cohortKey.split("-").map(Number);

            const monthValues: number[] = [];

            for (let i = 0; i < 12; i++) {
                const targetDate = this.getLastDayOfMonth(year, month - 1 + i);
                if (targetDate > new Date()) break;

                let activeCount = 0;
                for (const customerId of customerIds) {
                    const mrr = await this.getCustomerMrrAtDate(customerId, targetDate);
                    if (mrr > 0) activeCount++;
                }

                monthValues.push(activeCount);
            }

            cohorts.push({
                cohort: cohortKey,
                initialSize: monthValues[0] || 0,
                months: monthValues,
            });
        }

        return cohorts;
    }

    /**
     * Helper to get a customer's total MRR at a specific date
     */
    private static async getCustomerMrrAtDate(customerId: string, date: Date): Promise<number> {
        // Find all subscriptions for this customer
        const subscriptions = await db.subscription.findMany({
            where: { customerId },
            select: { id: true },
        });

        let totalMrr = 0;

        for (const sub of subscriptions) {
            // Find the last movement for this subscription before or on the date
            // We want the movement with the MAX effectiveDate that is <= date.

            const movement = await db.mrrMovement.findFirst({
                where: {
                    subscriptionId: sub.id,
                    effectiveDate: { lte: date },
                },
                orderBy: [
                    { effectiveDate: "desc" },
                    { createdAt: "desc" }
                ],
            });

            if (movement) {
                totalMrr += movement.newMrr;
            }
        }

        return totalMrr;
    }
}
