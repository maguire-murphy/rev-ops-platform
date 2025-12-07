import { NextResponse } from "next/server";
import { db } from "@/server/db/client";
import { MrrService } from "@/server/services/mrr-service";

export async function GET(req: Request) {
    try {
        // In a real app, verify a secret key header here
        // const authHeader = req.headers.get('authorization');
        // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        //   return new NextResponse('Unauthorized', { status: 401 });
        // }

        // 1. Get all organizations
        const organizations = await db.organization.findMany({
            select: { id: true },
        });

        console.log(`Starting daily snapshot for ${organizations.length} organizations...`);

        // 2. Create snapshot for each organization
        const results = [];
        for (const org of organizations) {
            const totalMrr = await MrrService.createDailySnapshot(org.id);
            results.push({ organizationId: org.id, totalMrr });
        }

        return NextResponse.json({
            success: true,
            processed: results.length,
            results,
        });
    } catch (error) {
        console.error("Daily snapshot cron failed:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
