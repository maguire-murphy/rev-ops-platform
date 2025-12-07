import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db/client";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Development Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
            },
            async authorize(credentials) {
                // In development, allow any email to login
                if (process.env.NODE_ENV === "development") {
                    return {
                        id: "dev-user-id",
                        email: credentials.email as string,
                        name: "Dev User",
                        image: "https://github.com/shadcn.png",
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            };
        },
    },
    session: {
        strategy: "jwt",
    },
});
