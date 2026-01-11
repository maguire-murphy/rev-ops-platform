"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Zap, BarChart3 } from "lucide-react";
import { ConnectStripeButton } from "@/components/integrations/connect-stripe-button";
import { ConnectHubSpotButton } from "@/components/integrations/connect-hubspot-button";

export default function OnboardingSetupPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome to Beacon",
            description: "Let's get you set up with your revenue operations dashboard",
            content: (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
                        <Zap className="h-8 w-8 text-indigo-600" />
                        <div>
                            <h3 className="font-semibold text-indigo-900">Quick Setup</h3>
                            <p className="text-sm text-indigo-700">Connect your tools in 2 minutes</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                        <div>
                            <h3 className="font-semibold text-green-900">Instant Insights</h3>
                            <p className="text-sm text-green-700">See your MRR and pipeline data immediately</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Connect Stripe",
            description: "Sync your subscription and revenue data",
            content: (
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Why connect Stripe?</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Automatically track MRR, ARR, and customer metrics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Monitor churn and expansion revenue</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Get board-ready financial reports</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-center pt-4">
                        <ConnectStripeButton />
                    </div>
                    <p className="text-xs text-center text-slate-500">
                        You can skip this step and connect later in Settings
                    </p>
                </div>
            ),
        },
        {
            title: "Connect HubSpot",
            description: "Sync your CRM and pipeline data",
            content: (
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Why connect HubSpot?</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Track deal velocity and win rates</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Forecast revenue from your pipeline</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Identify at-risk deals early</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-center pt-4">
                        <ConnectHubSpotButton />
                    </div>
                    <p className="text-xs text-center text-slate-500">
                        You can skip this step and connect later in Settings
                    </p>
                </div>
            ),
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push("/dashboard");
        }
    };

    const handleSkip = () => {
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 h-2 rounded-full mx-1 transition-all ${index <= currentStep ? "bg-indigo-600" : "bg-slate-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 text-center">
                            Step {currentStep + 1} of {steps.length}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-slate-600 mb-6">{steps[currentStep].description}</p>
                        {steps[currentStep].content}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSkip}
                            className="text-sm text-slate-600 hover:text-slate-900"
                        >
                            Skip for now
                        </button>
                        <button
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            {currentStep === steps.length - 1 ? "Go to Dashboard" : "Next"}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
