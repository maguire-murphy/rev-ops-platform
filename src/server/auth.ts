import NextAuth from "next-auth";
import { db } from "@/server/db/client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

if (!authSecret) {
    throw new Error("AUTH_SECRET or NEXTAUTH_SECRET must be set");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    basePath: "/api/auth",
    secret: authSecret,
    session: {
        strategy: "jwt",
    },
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production"
                ? "__Secure-next-auth.session-token"
                : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    console.log("[Auth] Starting authorization");
                    // Safe logging - avoid logging plain password in production
                    console.log("[Auth] Credentials received for:", credentials?.email);

                    if (!credentials?.email || !credentials?.password) {
                        console.log("[Auth] Missing credentials");
                        return null;
                    }

                    console.log("[Auth] Fetching user from DB...");
                    const user = await db.user.findUnique({
                        where: { email: credentials.email as string },
                    });
                    console.log("[Auth] DB lookup result:", user ? "User found" : "User NOT found");

                    if (!user || !user.password) {
                        console.log("[Auth] User not found or no password");
                        return null;
                    }

                    console.log("[Auth] Verifying password...");
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );
                    console.log("[Auth] Password verification result:", isPasswordValid);

                    if (!isPasswordValid) {
                        console.log("[Auth] Invalid password");
                        return null;
                    }

                    console.log("[Auth] Auth successful for:", user.email);
                    return {
                        id: user.id,
                        email: user.email!,
                        name: user.name!,
                    };
                } catch (error) {
                    console.error("[Auth] Authorize error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string,
                },
            };
        },
    },
    pages: {
        signIn: "/login",
    },
});
