import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db/client";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { Metadata } from "next";

// Prevent search engines from indexing dashboard pages
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/api/auth/signin");
    }

    // Fetch user to get latest organizationId
    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { organizationId: true },
    });

    if (!user?.organizationId) {
        redirect("/onboarding");
    }

    return (
        <MobileMenuProvider>
            <div className="flex h-screen bg-slate-50">
                <Sidebar />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
            </div>
        </MobileMenuProvider>
    );
}
