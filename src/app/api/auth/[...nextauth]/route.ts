import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { signInEmailPassword } from "@/auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo electrónico", type: "email", placeholder: "usuario@email.com" },
                password: { label: "Contraseña", type: "password", placeholder: "******" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = signInEmailPassword(credentials!.email, credentials!.password);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email ?? "no-email"
                }
            });

            token.roles = dbUser?.roles ?? ["no-roles"];
            token.id = dbUser?.id ?? "no-uuid";
            return token;
        },
        async session({ session, token, user }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        }
    }
}

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };