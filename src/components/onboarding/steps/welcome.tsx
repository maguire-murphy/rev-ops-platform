"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { createOrganization } from "@/server/actions/auth";
import { useSession } from "next-auth/react";

interface WelcomeStepProps {
    onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = async () => {
        if (!session?.user?.id) return;

        setIsLoading(true);
        try {
            // Use a default company name or prompt for it earlier. 
            // For now, we'll use "My Company" or user's name's Company
            const companyName = session.user.name ? `${session.user.name}'s Company` : "My Company";

            await createOrganization(session.user.id, companyName);
            onNext();
        } catch (error) {
            console.error("Failed to create organization:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const firstName = session?.user?.name?.split(" ")[0];

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {firstName ? `Welcome, ${firstName}!` : "Welcome!"}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
                We're excited to help you get a clear view of your revenue metrics.
            </p>
            <p className="mt-2 text-slate-600">
                To get started, we'll need to connect your data sources. This will only take a few minutes.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-6 text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 font-bold">
                            1
                        </div>
                        <h3 className="font-semibold text-slate-900">Connect Stripe</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                        We'll import your customers, subscriptions, and transactions to calculate MRR.
                    </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-6 text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-bold">
                            2
                        </div>
                        <h3 className="font-semibold text-slate-900">Connect HubSpot</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                        We'll sync your deals and activities to give you pipeline visibility.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <button
                    onClick={handleStart}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Setting up workspace...
                        </>
                    ) : (
                        <>
                            Let's get started
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
