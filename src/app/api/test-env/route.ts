import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hasAuthSecret: !!process.env.AUTH_SECRET,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasAuthUrl: !!process.env.AUTH_URL,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        hasTrustHost: !!process.env.AUTH_TRUST_HOST,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        authSecretLength: process.env.AUTH_SECRET?.length || 0,
        nodeEnv: process.env.NODE_ENV,
    });
}
