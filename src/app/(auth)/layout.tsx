import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
    ...generateMetadata({
        title: "Sign In",
        description: "Sign in to access your SaaS revenue metrics, MRR tracking, and pipeline analytics.",
        path: "/login",
        noIndex: true, // Don't index auth pages
    }),
    robots: {
        index: false,
        follow: false,
    },
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
