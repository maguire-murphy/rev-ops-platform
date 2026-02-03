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

            if (result?.error) {
                console.error("Demo login error:", result.error);
                alert("Demo login failed. Key credentials might be missing.");
            } else if (result?.ok) {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error("Demo login exception:", err);
            alert("An error occurred during demo login.");
        } finally {
            setIsLoading(false);
        }
    };

    const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0";

    const variantStyles = {
        primary: "bg-yellow-primary text-navy-deep hover:bg-yellow-soft border border-yellow-primary",
        secondary: "bg-transparent text-yellow-primary border-2 border-yellow-primary hover:bg-yellow-primary/10",
    };

    const sizeStyles = {
        default: "px-5 py-2.5 text-sm",
        large: "px-8 py-4 text-base",
    };

    return (
        <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    <Play className="h-5 w-5 fill-current" />
                    <span>Try Demo</span>
                </>
            )}
        </button>
    );
}
