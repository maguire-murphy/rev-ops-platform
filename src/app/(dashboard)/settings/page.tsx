import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { ConnectStripeButton } from "@/components/integrations/connect-stripe-button";
import { SyncStripeButton } from "@/components/integrations/sync-stripe-button";
import { ConnectHubSpotButton } from "@/components/integrations/connect-hubspot-button";
import { SyncHubSpotButton } from "@/components/integrations/sync-hubspot-button";
import { CheckCircle, XCircle, Lock } from "lucide-react";

import { DisconnectButton } from "@/components/integrations/disconnect-button";

export default async function SettingsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const session = await auth();
    const searchParams = await props.searchParams;

    // Get user's organizationId
    const user = await db.user.findUnique({
        where: { id: session?.user?.id },
        select: { organizationId: true },
    });

    const organizationId = user?.organizationId;

    // Fetch integration status - MUST filter by organizationId
    const integration = organizationId ? await db.integration.findFirst({
        where: {
            provider: "stripe",
            organizationId,
        },
    }) : null;

    const hubspotIntegration = organizationId ? await db.integration.findFirst({
        where: {
            provider: "hubspot",
            organizationId,
        },
    }) : null;

    const isStripeConnected = !!integration;
    const isHubSpotConnected = !!hubspotIntegration;
    const success = searchParams?.success;
    const error = searchParams?.error;
    
    // Check if integrations are demo-locked
    const isStripeDemoLocked = integration?.metadata && typeof integration.metadata === 'object' && 'locked' in integration.metadata && integration.metadata.locked === true;
    const isHubSpotDemoLocked = hubspotIntegration?.metadata && typeof hubspotIntegration.metadata === 'object' && 'locked' in hubspotIntegration.metadata && hubspotIntegration.metadata.locked === true;
    const isDemoMode = isStripeDemoLocked || isHubSpotDemoLocked;

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-slate-500">Manage your integrations and account settings.</p>
            </div>

            {success === "stripe_connected" && (
                <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Successfully connected to Stripe</h3>
                        </div>
                    </div>
                </div>
            )}

            {success === "hubspot_connected" && (
                <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Successfully connected to HubSpot</h3>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Connection failed: {error}</h3>
                        </div>
                    </div>
                </div>
            )}

            {isDemoMode && (
                <div className="rounded-md bg-amber-50 border border-amber-200 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Lock className="h-5 w-5 text-amber-500" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-amber-800">Demo Mode</h3>
                            <p className="mt-1 text-sm text-amber-700">
                                This is a demo environment with pre-configured integrations. 
                                Integration settings are locked to preserve the demo experience.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium leading-6 text-slate-900">Integrations</h3>
                <div className="mt-4 space-y-4">
                    {/* Stripe */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                S
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Stripe</p>
                                <p className="text-sm text-slate-500">
                                    {isStripeConnected
                                        ? "Connected to " + (integration?.stripeAccountId || "account")
                                        : "Connect your Stripe account to sync data."}
                                </p>
                            </div>
                        </div>
                        <div>
                            {isStripeConnected ? (
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        Connected
                                    </span>
                                    {isStripeDemoLocked ? (
                                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                            <Lock className="h-3 w-3" /> Demo
                                        </span>
                                    ) : (
                                        <>
                                            <SyncStripeButton />
                                            <DisconnectButton provider="stripe" />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <ConnectStripeButton />
                            )}
                        </div>
                    </div>

                    {/* HubSpot */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-[#ff7a59]/10 flex items-center justify-center text-[#ff7a59] font-bold">
                                H
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">HubSpot</p>
                                <p className="text-sm text-slate-500">
                                    {isHubSpotConnected
                                        ? "Connected to HubSpot"
                                        : "Connect your HubSpot account to sync CRM data."}
                                </p>
                            </div>
                        </div>
                        <div>
                            {isHubSpotConnected ? (
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        Connected
                                    </span>
                                    {isHubSpotDemoLocked ? (
                                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                            <Lock className="h-3 w-3" /> Demo
                                        </span>
                                    ) : (
                                        <>
                                            <SyncHubSpotButton />
                                            <DisconnectButton provider="hubspot" />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <ConnectHubSpotButton />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
