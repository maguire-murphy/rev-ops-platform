import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { ConnectStripeButton } from "@/components/integrations/connect-stripe-button";
import { SyncStripeButton } from "@/components/integrations/sync-stripe-button";
import { CheckCircle, XCircle } from "lucide-react";

export default async function SettingsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const session = await auth();
    const searchParams = await props.searchParams;

    // Fetch integration status
    // In a real app, we'd query by organizationId
    const integration = await db.integration.findFirst({
        where: {
            provider: "stripe",
            // organizationId: session?.user?.organizationId 
        },
    });

    const isConnected = !!integration;
    const success = searchParams?.success === "stripe_connected";
    const error = searchParams?.error;

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-slate-500">Manage your integrations and account settings.</p>
            </div>

            {success && (
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

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium leading-6 text-slate-900">Integrations</h3>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                S
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Stripe</p>
                                <p className="text-sm text-slate-500">
                                    {isConnected
                                        ? "Connected to " + (integration?.stripeAccountId || "account")
                                        : "Connect your Stripe account to sync data."}
                                </p>
                            </div>
                        </div>
                        <div>
                            {isConnected ? (
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        Connected
                                    </span>
                                    <SyncStripeButton />
                                </div>
                            ) : (
                                <ConnectStripeButton />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
