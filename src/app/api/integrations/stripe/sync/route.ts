import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { StripeSyncService } from "@/server/services/stripe-sync";

export async function POST(req: Request) {
    try {
        const session = await auth();

        // Cast to any to access organizationId if types are not fully extended yet
        const organizationId = (session?.user as any)?.organizationId;

        if (!organizationId) {
            return new NextResponse("Unauthorized: No organization found", { status: 401 });
        }

        const result = await StripeSyncService.syncOrganization(organizationId);

        return NextResponse.json({
            success: true,
            ...result
        });
    } catch (error: any) {
        console.error("Stripe sync failed:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
