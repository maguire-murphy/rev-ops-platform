"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/server/actions/auth";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Simple password strength calculator (reused)
    const getPasswordStrength = (password: string) => {
        if (!password) return 0;
        let score = 0;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        return score;
    };

    const strength = getPasswordStrength(password);
    const strengthColor = [
        "bg-slate-200",
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
    ][strength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!token) {
            setError("Invalid or missing reset token.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(token, password);
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to reset password. The link may have expired.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">Invalid or missing reset token. Please request a new link.</p>
                <div className="mt-4">
                    <Link href="/forgot-password" className="text-sm font-medium text-red-800 hover:text-red-700 underline">
                        Request new link
                    </Link>
                </div>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900">Password reset successfully!</h3>
                <p className="mt-1 text-sm text-slate-500">You can now log in with your new password.</p>
                <div className="mt-6">
                    <Link
                        href="/login"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    New Password
                </label>
                <div className="mt-1 relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Eye className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                </div>
                {/* Password Strength Indicator */}
                {password && (
                    <div className="mt-2">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${strengthColor} transition-all duration-300`}
                                style={{ width: `${(strength / 4) * 100}%` }}
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                            {strength < 2 && "Weak password"}
                            {strength === 2 && "Medium strength"}
                            {strength === 3 && "Strong password"}
                            {strength === 4 && "Very strong password"}
                        </p>
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                    Confirm Password
                </label>
                <div className="mt-1">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4" role="alert" aria-live="polite">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resetting password...
                        </>
                    ) : (
                        "Reset password"
                    )}
                </button>
            </div>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                        B
                    </div>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                    Set new password
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
