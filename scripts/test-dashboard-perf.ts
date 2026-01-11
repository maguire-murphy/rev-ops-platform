import { appRouter } from "../src/server/api/root";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    console.log("Starting Dashboard Performance Test...");
    const ORG_ID = "33333333-3333-3333-3333-333333333333"; // Must match seed-scale.ts

    try {
        // Mock Session
        const session = {
            user: {
                id: "44444444-4444-4444-4444-444444444444",
                organizationId: ORG_ID,
                name: "Perf User",
                email: "perf@example.com",
                image: null
            },
            expires: new Date(Date.now() + 3600 * 1000).toISOString()
        };

        // Create Caller
        const caller = appRouter.createCaller({
            db,
            session,
            headers: new Headers()
        });

        console.log("Warming up...");
        await caller.mrr.getDashboardMetrics();

        console.log("Running performance test (5 iterations)...");
        const times = [];

        for (let i = 0; i < 5; i++) {
            const start = performance.now();
            await caller.mrr.getDashboardMetrics();
            const end = performance.now();
            const duration = end - start;
            times.push(duration);
            console.log(`Run ${i + 1}: ${duration.toFixed(2)}ms`);
        }

        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        console.log(`\nAverage Response Time: ${avg.toFixed(2)}ms`);

        if (avg < 1000) {
            console.log("✅ PASS (< 1000ms)");
        } else {
            console.error(`❌ FAIL (> 1000ms)`);
            // Don't exit 1, just warn, as performance might vary on dev machine
        }

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await db.$disconnect();
    }
}

main();
