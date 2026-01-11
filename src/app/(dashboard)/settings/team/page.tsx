"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Loader2, Plus, Mail, User as UserIcon } from "lucide-react";

export default function TeamSettingsPage() {
    const { data: org, isLoading, refetch } = api.organization.getSettings.useQuery();
    const [isInviting, setIsInviting] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"admin" | "member">("member");
    const [error, setError] = useState("");

    const inviteMutation = api.organization.inviteMember.useMutation({
        onSuccess: () => {
            setIsInviting(false);
            setInviteEmail("");
            refetch();
        },
        onError: (e) => {
            setError(e.message);
        },
    });

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        inviteMutation.mutate({ email: inviteEmail, role: inviteRole });
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!org) {
        return <div>Organization not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Team Settings</h1>
                <p className="text-sm text-slate-500">Manage your team members and permissions.</p>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-slate-50 border-b border-slate-200">
                    <h3 className="text-base font-semibold leading-6 text-slate-900">Members</h3>
                    <button
                        onClick={() => setIsInviting(!isInviting)}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Invite Member
                    </button>
                </div>

                {isInviting && (
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <form onSubmit={handleInvite} className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="colleague@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                                <select
                                    id="role"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value as "admin" | "member")}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={inviteMutation.isPending}
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                            >
                                {inviteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Invite"}
                            </button>
                        </form>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    </div>
                )}

                <ul role="list" className="divide-y divide-slate-200">
                    {org.users.map((user) => (
                        <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-slate-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        {user.image ? (
                                            <img src={user.image} alt="" className="h-10 w-10 rounded-full" />
                                        ) : (
                                            <UserIcon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{user.name || "Pending Invite"}</p>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                                        user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                            'bg-slate-100 text-slate-800'
                                    }`}>
                                    {user.role}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
