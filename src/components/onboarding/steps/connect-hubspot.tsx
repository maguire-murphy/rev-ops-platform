"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { getHubSpotOAuthUrl } from "@/server/actions/integrations";

interface ConnectHubSpotStepProps {
    onNext: () => void;
    onSkip: () => void;
    isConnected?: boolean;
}

export function ConnectHubSpotStep({ onNext, onSkip, isConnected = false }: ConnectHubSpotStepProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam) {
            if (errorParam === "access_denied") {
                setError("You canceled the HubSpot connection. You can try again or skip for now.");
            } else {
                setError("Failed to connect to HubSpot. Please try again.");
            }
        }
    }, [searchParams]);

    const handleConnect = async () => {
        setIsLoading(true);
        try {
            const url = await getHubSpotOAuthUrl("onboarding");
            window.location.href = url;
        } catch (error) {
            console.error("Failed to get HubSpot OAuth URL:", error);
            setIsLoading(false);
        }
    };

    if (isConnected) {
        return (
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                    HubSpot Connected!
                </h2>
                <p className="mt-2 text-slate-600">
                    We're syncing your deals and activities.
                </p>
                <div className="mt-8">
                    <button
                        onClick={onNext}
                        className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Continue to Final Step
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-[#FF7A59] rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                H
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                Connect HubSpot
            </h2>
            <p className="mt-2 text-slate-600 max-w-md mx-auto">
                Connect HubSpot to sync your sales pipeline, deals, and activity data.
            </p>

            <div className="mt-8 space-y-4">
                <button
                    onClick={handleConnect}
                    disabled={isLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#FF7A59] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#ff8f73] disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Connecting...
                        </>
                    ) : (
                        "Connect HubSpot"
                    )}
                </button>

                <div>
                    <button
                        onClick={onSkip}
                        className="text-sm font-medium text-slate-500 hover:text-slate-700"
                    >
                        Skip for now
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-6 rounded-md bg-red-50 p-4 text-left max-w-lg mx-auto" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 rounded-md bg-blue-50 p-4 text-left max-w-lg mx-auto">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">What we sync</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Companies and Contacts</li>
                                <li>Deals and Pipelines</li>
                                <li>Engagements (Emails, Calls, Meetings)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
