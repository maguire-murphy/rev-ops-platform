
import { Metadata } from "next";

export const metadata: Metadata = {
    themeColor: "#0A1628",
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-navy-deep text-slate-300">
            <div className="relative">
                {/* Background gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-navy-rich/30 blur-3xl opacity-50" />
                    <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-navy-rich/30 blur-3xl opacity-30" />
                </div>

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
