import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { StripeSyncService } from "@/server/services/stripe-sync";

export async function POST() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch user's organizationId from database
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return new NextResponse("Unauthorized: No organization found", { status: 401 });
        }

        const result = await StripeSyncService.syncOrganization(user.organizationId);

        return NextResponse.json({
            success: true,
            ...result
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Stripe sync failed:", error);
        return new NextResponse(errorMessage, { status: 500 });
    }
}
