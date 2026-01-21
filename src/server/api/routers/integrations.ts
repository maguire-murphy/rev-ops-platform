import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db/client";

export const integrationsRouter = createTRPCRouter({
    getStatus: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;

        // Get user's organization
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { organizationId: true },
        });

        if (!user?.organizationId) {
            return {
                stripeConnected: false,
                hubspotConnected: false,
                lastStripeSync: null,
                lastHubspotSync: null,
            };
        }

        // Check for integrations
        const stripeIntegration = await db.integration.findFirst({
            where: {
                organizationId: user.organizationId,
                provider: "stripe",
            },
            select: {
                id: true,
                lastSyncAt: true,
                stripeAccountId: true,
            },
        });

        const hubspotIntegration = await db.integration.findFirst({
            where: {
                organizationId: user.organizationId,
                provider: "hubspot",
            },
            select: {
                id: true,
                lastSyncAt: true,
            },
        });

        return {
            stripeConnected: !!stripeIntegration,
            hubspotConnected: !!hubspotIntegration,
            stripeAccountId: stripeIntegration?.stripeAccountId || null,
            lastStripeSync: stripeIntegration?.lastSyncAt || null,
            lastHubspotSync: hubspotIntegration?.lastSyncAt || null,
        };
    }),
});
