import { db } from "@/server/db/client";
import { hubspotClient, HUBSPOT_CONFIG } from "@/server/integrations/hubspot";
import { decrypt, encrypt } from "@/server/utils/encryption";

export class HubSpotSyncService {
    /**
     * Retrieves the access token for an integration.
     */
    private static async getAccessToken(integrationId: string): Promise<{ accessToken: string; refreshToken: string }> {
        const integration = await db.integration.findUnique({
            where: { id: integrationId },
        });

        if (!integration || !integration.accessTokenEncrypted || !integration.refreshTokenEncrypted) {
            throw new Error("Integration not found or missing tokens");
        }

        return {
            accessToken: decrypt(integration.accessTokenEncrypted),
            refreshToken: decrypt(integration.refreshTokenEncrypted),
        };
    }

    /**
     * Refreshes the access token using the refresh token.
     */
    private static async refreshAccessToken(integrationId: string, refreshToken: string): Promise<string> {
        console.log("Refreshing HubSpot access token...");
        try {
            const response = await hubspotClient.oauth.tokensApi.create(
                "refresh_token",
                undefined,
                undefined,
                HUBSPOT_CONFIG.clientId,
                HUBSPOT_CONFIG.clientSecret,
                refreshToken
            );

            const newAccessToken = response.accessToken;
            const newRefreshToken = response.refreshToken;

            // Update DB
            await db.integration.update({
                where: { id: integrationId },
                data: {
                    accessTokenEncrypted: encrypt(newAccessToken),
                    refreshTokenEncrypted: encrypt(newRefreshToken),
                },
            });

            return newAccessToken;
        } catch (error) {
            console.error("Failed to refresh HubSpot token:", error);
            throw error;
        }
    }

    /**
     * Syncs Companies from HubSpot to Customers in DB.
     */
    static async syncCompanies(integrationId: string) {
        const { accessToken, refreshToken } = await this.getAccessToken(integrationId);
        const integration = await db.integration.findUnique({ where: { id: integrationId } });

        if (!integration) throw new Error("Integration not found");

        hubspotClient.setAccessToken(accessToken);

        try {
            await this.fetchAndSaveCompanies(integration.organizationId);
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            if (err.code === 401 || (err.response && err.response.status === 401)) {
                console.log("Access token expired, refreshing...");
                const newAccessToken = await this.refreshAccessToken(integrationId, refreshToken);
                hubspotClient.setAccessToken(newAccessToken);
                await this.fetchAndSaveCompanies(integration.organizationId);
            } else {
                throw error;
            }
        }
    }

    private static async fetchAndSaveCompanies(organizationId: string) {
        console.log("Fetching companies from HubSpot...");

        const limit = 100;
        let after: string | undefined = undefined;
        let hasMore = true;

        while (hasMore) {
            const response = await hubspotClient.crm.companies.basicApi.getPage(
                limit,
                after,
                ["name", "domain", "city", "state", "country"]
            );

            const companies = response.results;
            console.log(`Fetched ${companies.length} companies.`);

            for (const company of companies) {
                const name = company.properties.name;
                const domain = company.properties.domain;

                if (!name) continue;

                // Try to find existing customer by HubSpot ID or Domain
                const existingCustomer = await db.customer.findFirst({
                    where: {
                        organizationId,
                        OR: [
                            { hubspotCompanyId: company.id },
                        ]
                    }
                });

                if (existingCustomer) {
                    // Update
                    await db.customer.update({
                        where: { id: existingCustomer.id },
                        data: {
                            hubspotCompanyId: company.id,
                            name: name,
                            metadata: {
                                ...(existingCustomer.metadata as object),
                                hubspot: {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ...((existingCustomer.metadata as any)?.hubspot || {}),
                                    domain,
                                    city: company.properties.city,
                                    state: company.properties.state,
                                    country: company.properties.country,
                                    lastSync: new Date().toISOString()
                                }
                            }
                        }
                    });
                } else {
                    // Create new customer
                    await db.customer.create({
                        data: {
                            organizationId,
                            hubspotCompanyId: company.id,
                            name: name,
                            metadata: {
                                hubspot: {
                                    domain,
                                    city: company.properties.city,
                                    state: company.properties.state,
                                    country: company.properties.country,
                                    lastSync: new Date().toISOString()
                                }
                            }
                        }
                    });
                }
            }

            if (response.paging && response.paging.next && response.paging.next.after) {
                after = response.paging.next.after;
            } else {
                hasMore = false;
            }
        }
    }

    /**
     * Syncs Deals from HubSpot to Deals in DB.
     */
    static async syncDeals(integrationId: string) {
        const { accessToken, refreshToken } = await this.getAccessToken(integrationId);
        const integration = await db.integration.findUnique({ where: { id: integrationId } });

        if (!integration) throw new Error("Integration not found");

        hubspotClient.setAccessToken(accessToken);

        try {
            await this.fetchAndSaveDeals(integration.organizationId);
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            if (err.code === 401 || (err.response && err.response.status === 401)) {
                console.log("Access token expired, refreshing...");
                const newAccessToken = await this.refreshAccessToken(integrationId, refreshToken);
                hubspotClient.setAccessToken(newAccessToken);
                await this.fetchAndSaveDeals(integration.organizationId);
            } else {
                throw error;
            }
        }
    }

    private static async fetchAndSaveDeals(organizationId: string) {
        console.log("Fetching deals from HubSpot...");

        const limit = 100;
        let after: string | undefined = undefined;
        let hasMore = true;

        while (hasMore) {
            const response = await hubspotClient.crm.deals.basicApi.getPage(
                limit,
                after,
                ["dealname", "amount", "dealstage", "pipeline", "closedate", "createdate", "hubspot_owner_id"],
                undefined,
                ["companies"]
            );

            const deals = response.results;
            console.log(`Fetched ${deals.length} deals.`);

            for (const deal of deals) {
                const properties = deal.properties;
                const dealId = deal.id;

                // Find associated company to link to Customer
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const companyAssociations = (deal as any).associations?.companies?.results || [];
                let customerId: string | null = null;

                if (companyAssociations.length > 0) {
                    const companyId = companyAssociations[0].id;
                    const customer = await db.customer.findFirst({
                        where: { organizationId, hubspotCompanyId: companyId }
                    });
                    if (customer) {
                        customerId = customer.id;
                    }
                }

                // Map fields
                const amount = properties.amount ? parseFloat(properties.amount) * 100 : 0; // Cents
                const closeDate = properties.closedate ? new Date(properties.closedate) : null;
                const createdDate = properties.createdate ? new Date(properties.createdate) : new Date();

                // Upsert Deal
                const existingDeal = await db.deal.findFirst({
                    where: { organizationId, hubspotDealId: dealId }
                });

                const dealData = {
                    organizationId,
                    hubspotDealId: dealId,
                    customerId,
                    name: properties.dealname,
                    amount: Math.round(amount),
                    stage: properties.dealstage,
                    pipeline: properties.pipeline,
                    closeDate,
                    createdDate,
                    ownerId: properties.hubspot_owner_id,
                    isClosed: ["closedwon", "closedlost"].includes(properties.dealstage || ""), // Simplified check
                    isWon: properties.dealstage === "closedwon",
                    metadata: {
                        hubspot: {
                            lastSync: new Date().toISOString(),
                            properties
                        }
                    }
                };

                if (existingDeal) {
                    await db.deal.update({
                        where: { id: existingDeal.id },
                        data: dealData
                    });
                } else {
                    await db.deal.create({
                        data: dealData
                    });
                }
            }

            if (response.paging && response.paging.next && response.paging.next.after) {
                after = response.paging.next.after;
            } else {
                hasMore = false;
            }
        }
    }

    /**
     * Syncs Activities (Calls, Emails, Meetings) from HubSpot.
     */
    static async syncActivities(integrationId: string) {
        const { accessToken, refreshToken } = await this.getAccessToken(integrationId);
        const integration = await db.integration.findUnique({ where: { id: integrationId } });

        if (!integration) throw new Error("Integration not found");

        hubspotClient.setAccessToken(accessToken);

        try {
            await this.syncCalls(integration.organizationId);
            await this.syncEmails(integration.organizationId);
            await this.syncMeetings(integration.organizationId);
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            if (err.code === 401 || (err.response && err.response.status === 401)) {
                console.log("Access token expired, refreshing...");
                const newAccessToken = await this.refreshAccessToken(integrationId, refreshToken);
                hubspotClient.setAccessToken(newAccessToken);

                // Retry all
                await this.syncCalls(integration.organizationId);
                await this.syncEmails(integration.organizationId);
                await this.syncMeetings(integration.organizationId);
            } else {
                throw error;
            }
        }
    }

    private static async syncCalls(organizationId: string) {
        console.log("Fetching calls from HubSpot...");
        await this.fetchAndSaveActivities(
            organizationId,
            hubspotClient.crm.objects.calls.basicApi,
            "call",
            ["hs_call_title", "hs_call_body", "hs_call_duration", "hs_timestamp"],
            (props) => ({
                subject: props.hs_call_title,
                activityDate: props.hs_timestamp ? new Date(props.hs_timestamp) : new Date(),
                durationMinutes: props.hs_call_duration ? Math.round(parseInt(props.hs_call_duration) / 60000) : 0, // Duration is usually in ms
                content: props.hs_call_body
            })
        );
    }

    private static async syncEmails(organizationId: string) {
        console.log("Fetching emails from HubSpot...");
        await this.fetchAndSaveActivities(
            organizationId,
            hubspotClient.crm.objects.emails.basicApi,
            "email",
            ["hs_email_subject", "hs_email_text", "hs_timestamp", "hs_email_direction"],
            (props) => ({
                subject: props.hs_email_subject,
                activityDate: props.hs_timestamp ? new Date(props.hs_timestamp) : new Date(),
                content: props.hs_email_text,
                direction: props.hs_email_direction === "EMAIL" ? "outbound" : "inbound" // Rough mapping
            })
        );
    }

    private static async syncMeetings(organizationId: string) {
        console.log("Fetching meetings from HubSpot...");
        await this.fetchAndSaveActivities(
            organizationId,
            hubspotClient.crm.objects.meetings.basicApi,
            "meeting",
            ["hs_meeting_title", "hs_meeting_body", "hs_meeting_start_time", "hs_meeting_end_time"],
            (props) => {
                const start = props.hs_meeting_start_time ? new Date(props.hs_meeting_start_time) : new Date();
                const end = props.hs_meeting_end_time ? new Date(props.hs_meeting_end_time) : start;
                const duration = (end.getTime() - start.getTime()) / 60000;
                return {
                    subject: props.hs_meeting_title,
                    activityDate: start,
                    durationMinutes: Math.round(duration),
                    content: props.hs_meeting_body
                };
            }
        );
    }

    private static async fetchAndSaveActivities(
        organizationId: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api: any,
        type: string,
        propertiesToFetch: string[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mapper: (props: any) => any
    ) {
        const limit = 100;
        let after: string | undefined = undefined;
        let hasMore = true;

        while (hasMore) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await api.getPage(
                limit,
                after,
                propertiesToFetch,
                undefined,
                ["deals", "companies"]
            );

            const results = response.results;
            console.log(`Fetched ${results.length} ${type}s.`);

            for (const item of results) {
                const properties = item.properties;
                const mapped = mapper(properties);

                // Associations
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const associations = (item as any).associations;

                let dealId: string | null = null;
                let customerId: string | null = null;

                // Link to Deal
                if (associations?.deals?.results?.length > 0) {
                    const hubspotDealId = associations.deals.results[0].id;
                    const deal = await db.deal.findFirst({ where: { organizationId, hubspotDealId } });
                    if (deal) dealId = deal.id;
                }

                // Link to Customer (Company)
                if (associations?.companies?.results?.length > 0) {
                    const hubspotCompanyId = associations.companies.results[0].id;
                    const customer = await db.customer.findFirst({ where: { organizationId, hubspotCompanyId } });
                    if (customer) customerId = customer.id;
                }

                // If linked to Deal but not Customer, try to get Customer from Deal
                if (dealId && !customerId) {
                    const deal = await db.deal.findUnique({ where: { id: dealId }, select: { customerId: true } });
                    if (deal?.customerId) customerId = deal.customerId;
                }

                // Upsert Activity
                const existingActivity = await db.activity.findFirst({
                    where: { organizationId, hubspotEngagementId: item.id }
                });

                const activityData = {
                    organizationId,
                    hubspotEngagementId: item.id,
                    activityType: type,
                    subject: mapped.subject,
                    activityDate: mapped.activityDate,
                    durationMinutes: mapped.durationMinutes,
                    direction: mapped.direction,
                    dealId,
                    customerId,
                    metadata: {
                        hubspot: {
                            lastSync: new Date().toISOString(),
                            content: mapped.content,
                            properties
                        }
                    }
                };

                if (existingActivity) {
                    await db.activity.update({
                        where: { id: existingActivity.id },
                        data: activityData
                    });
                } else {
                    await db.activity.create({
                        data: activityData
                    });
                }
            }

            if (response.paging && response.paging.next && response.paging.next.after) {
                after = response.paging.next.after;
            } else {
                hasMore = false;
            }
        }
    }
}
