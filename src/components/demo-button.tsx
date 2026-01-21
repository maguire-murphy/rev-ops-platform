"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Play } from "lucide-react";

const DEMO_CREDENTIALS = {
    email: "demo@revops.app",
    password: "demo1234",
};

interface DemoButtonProps {
    variant?: "primary" | "secondary";
    size?: "default" | "large";
    className?: string;
}

export function DemoButton({ variant = "primary", size = "default", className = "" }: DemoButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDemoLogin = async () => {
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: DEMO_CREDENTIALS.email,
                password: DEMO_CREDENTIALS.password,
                redirect: false,
            });

            if (!result?.error) {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error("Demo login failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantStyles = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
        secondary: "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50",
    };

    const sizeStyles = {
        default: "px-4 py-2 text-sm",
        large: "px-6 py-3 text-base",
    };

    return (
        <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading Demo...
                </>
            ) : (
                <>
                    <Play className="h-4 w-4" />
                    Try Demo
                </>
            )}
        </button>
    );
}
