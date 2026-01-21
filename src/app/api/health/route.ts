import { NextResponse } from "next/server";
import { db } from "@/server/db/client";

/**
 * Health check endpoint for monitoring
 * Returns 200 OK if all systems are operational
 */
export async function GET() {
    const health = {
        status: "ok",
        timestamp: new Date().toISOString(),
        checks: {
            database: "unknown",
            app: "ok",
        },
    };

    try {
        // Check database connectivity
        await db.$queryRaw`SELECT 1`;
        health.checks.database = "ok";
    } catch (error) {
        health.checks.database = "error";
        health.status = "degraded";
    }

    const statusCode = health.status === "ok" ? 200 : 503;

    return NextResponse.json(health, { status: statusCode });
}
