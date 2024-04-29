import { db } from "@/lib/db";
import Env from "@/lib/env";
import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { ISODateString, Session, User, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";

export type CustomSession = {
	user?: CustomUser;
	expires: ISODateString;
};
export type CustomUser = {
	id?: string | null;
	name?: string | null;
	email?: string | null;
	role?: string | null;
	image?: string | null;
};
export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(db) as Adapter,
	session: {
		strategy: "jwt",
	},
	secret: Env.NEXTAUTH_SECRET!,
	providers: [
		GoogleProvider({
			profile(profile: GoogleProfile) {
				return {
					...profile,
					id: profile.sub,
					image: profile.picture,
					email_verified: profile.email_verified,
				};
			},
			clientId: Env.GOOGLE_CLIENT_ID,
			clientSecret: Env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	pages: {
		signIn: "/",
	},
	callbacks: {
		async signIn({ user, account, profile }: any) {
			if (account?.provider === "google") {
				//Check the email exists or not
				// Write Upsert query
				const checkUser = await db.user.upsert({
					where: { email: profile?.email },
					update: {
						name: profile?.name,
						image: profile?.picture,
						//TODO:Update the SChema first
						// emailVerified:profile?.email_verified,
					},
					create: {
						name: profile?.name,
						email: profile?.email,
						image: profile?.picture,
						//TODO:Update the SChema first
						// emailVerified:profile?.email_verified,
					},
				});
				if (checkUser) {
					return true;
				} else {
					return false;
				}
			}
			return true;
		},
		async jwt({ token, user }: { token: JWT; user: CustomUser }) {
			if (user) {
				user.role = user.role == null ? "USER" : user?.role;
				token.user = user;
			}
			return token;
		},
		async session({
			session,
			token,
			user,
		}: {
			session: CustomSession;
			token: JWT;
			user: CustomUser;
		}) {
			session.user = token.user as CustomUser;
			// console.log(session);
			return session;
		},
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
