import { Client } from "@hubspot/api-client";

export const hubspotClient = new Client();

export const HUBSPOT_CONFIG = {
    clientId: process.env.HUBSPOT_CLIENT_ID!,
    clientSecret: process.env.HUBSPOT_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/hubspot/callback`,
    scopes: [
        "crm.objects.contacts.read",
        "crm.objects.companies.read",
        "crm.objects.deals.read",
        "crm.schemas.deals.read",
    ].join(" "),
};
