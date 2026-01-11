"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { revalidatePath } from "next/cache";

export async function disconnectIntegration(provider: "stripe" | "hubspot") {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { organizationId: true },
    });

    const organizationId = user?.organizationId;

    if (!organizationId) {
        throw new Error("Unauthorized: No organization found");
    }

    await db.integration.deleteMany({
        where: {
            organizationId,
            provider,
        },
    });

    revalidatePath("/settings");
}
