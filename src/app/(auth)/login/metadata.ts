import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
    title: "Sign In",
    description: "Sign in to access revenue analytics, MRR tracking, and pipeline intelligence.",
    path: "/login",
    noIndex: true, // Don't index auth pages
});
