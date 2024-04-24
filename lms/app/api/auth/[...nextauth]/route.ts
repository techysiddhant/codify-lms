import { db } from "@/lib/db";
import Env from "@/lib/env";
import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { ISODateString, Session, User, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";
import { OAuthConfig } from "next-auth/providers/oauth";
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
// export type authOptionType = {
// 	adapter: Adapter;
// 	providers: OAuthConfig<GoogleProfile>[];
// 	callbacks: {
// 		signIn({ account, profile }: any): Promise<boolean>;
// 		jwt({ token, user }: { token: JWT; user: User }): Promise<JWT>;
// 		session({
// 			session,
// 			token,
// 			user,
// 		}: {
// 			token: JWT;
// 			user: User;
// 			session: CustomSession;
// 		}): Promise<JWT>;
// 	};
// };
export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: Env.GOOGLE_CLIENT_ID,
			clientSecret: Env.GOOGLE_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],

	callbacks: {
		async signIn({ account, profile }: any) {
			if (account?.provider === "google") {
				//Check the email exists or not
				const existingUser = await db.user.findUnique({
					where: { email: profile?.email },
				});
				if (!existingUser) {
					//USER is not exist in DB
					const newUser = await db.user.create({
						data: {
							name: profile?.name,
							email: profile?.email,
							image: profile?.image,
						},
					});
				} else {
				}
			}
			return true;
		},
		// async jwt({ token, user }: { token: JWT; user: CustomUser }) {
		// 	if (user) {
		// 		console.log(user);
		// 		token.user = user;
		// 	}
		// 	return token;
		// },
		// async session({
		// 	session,
		// 	token,
		// 	user,
		// }: {
		// 	session: CustomSession;
		// 	token: JWT;
		// 	user: User;
		// }) {
		// 	session.user = token.user as CustomUser;
		// 	return session;
		// },
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
