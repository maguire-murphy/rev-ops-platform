"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { Loader2, Save, User, Mail, Building } from "lucide-react";
import Link from "next/link";

export default function ProfileSettingsPage() {
    const { data: session, update: updateSession } = useSession();
    const [name, setName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { data: org } = api.organization.getSettings.useQuery();

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session?.user?.name]);

    const updateMutation = api.organization.updateProfile.useMutation({
        onSuccess: async () => {
            setSuccess(true);
            setError("");
            // Update the session to reflect changes
            await updateSession();
            setTimeout(() => setSuccess(false), 3000);
        },
        onError: (e) => {
            setError(e.message);
            setSuccess(false);
        },
        onSettled: () => {
            setIsSaving(false);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");
        updateMutation.mutate({ name });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Profile Settings</h1>
                <p className="text-sm text-slate-500">Manage your personal information and account settings.</p>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 border-b border-slate-200 pb-4">
                <Link 
                    href="/settings/profile" 
                    className="px-3 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600"
                >
                    Profile
                </Link>
                <Link 
                    href="/settings" 
                    className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    Integrations
                </Link>
                <Link 
                    href="/settings/team" 
                    className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    Team
                </Link>
            </div>

            {success && (
                <div className="rounded-md bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-800">Profile updated successfully!</p>
                </div>
            )}

            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6 space-y-6">
                    <h3 className="text-lg font-medium text-slate-900">Personal Information</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email Address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={session?.user?.email || ""}
                                    disabled
                                    className="block w-full pl-10 rounded-md border-slate-300 bg-slate-50 shadow-sm sm:text-sm text-slate-500"
                                />
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                                Email cannot be changed. Contact support if you need to update it.
                            </p>
                        </div>

                        {org && (
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-slate-700">
                                    Company
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="company"
                                        value={org.name || ""}
                                        disabled
                                        className="block w-full pl-10 rounded-md border-slate-300 bg-slate-50 shadow-sm sm:text-sm text-slate-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Account Section */}
            <div className="bg-white shadow rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-medium text-slate-900">Account</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-900">Password</p>
                            <p className="text-sm text-slate-500">Change your account password</p>
                        </div>
                        <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => alert("Password change coming soon. Use 'Forgot Password' on the login page for now.")}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white shadow rounded-lg p-6 border-2 border-red-100">
                <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Irreversible and destructive actions
                </p>
                
                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-inset ring-red-200 hover:bg-red-100"
                        onClick={() => alert("Account deletion is not available in the demo environment.")}
                    >
                        Delete Account
                    </button>
                    <p className="mt-2 text-xs text-slate-500">
                        This will permanently delete your account and all associated data.
                    </p>
                </div>
            </div>
        </div>
    );
}
