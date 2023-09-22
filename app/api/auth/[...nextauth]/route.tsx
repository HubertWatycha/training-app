import NextAuth from "next-auth/next";
import prisma from '../../../lib/prismadb'
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text", placeholder: "John Smith" },
            },
            async authorize(credentials) {
              
                // check to see if email and password is there
                if(!credentials.email || !credentials.password) {
                    return null;
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    return null;
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    return null;
                }

                return user;
            },
        }),  
    ],
    callbacks: {
        async jwt({ token, user, session, trigger }) {

            if (trigger === "update" && session?.name) {
                token.name = session.name;
            }
            if (user) {
               return {
                ...token,
                id: user.id,
                email: user.email,
                name: token.name
               };

            }

            return token;
        },
        async session ({ token, user, session }) {


            if (!session) {
                return {};
              }
            return{
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    name: token.name,
                }
            };
        }
    },

    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}