import passport from "passport";
// import { googleStrategy } from "passport-google-oauth20";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import prisma from "./config/db.config.js";
import logger from "./config/logger.js";

// const GoogleStrategy = new googleStrategy().Strategy;

const initializePassport = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
			},
			async function (accessToken, refreshToken, profile, done) {
				console.log(profile);
				const userData = {
					name: profile.displayName,
					email: profile.emails[0].value,
					provider: "google",
					providerId: profile.id,
					profile: profile.photos[0].value,
					// roles: ["user"], // Set default role(s) for the user
					// Add any additional data you want to save
				};
				try {
					const user = await prisma.user.findUnique({
						where: { email: profile.emails[0].value },
					});
					// console.log(user);
					if (user) {
						done(null, user);
					} else {
						const newUser = await prisma.user.create({
							data: {
								...userData,
							},
						});
						// console.log(newUser);
						done(null, newUser);
					}
				} catch (error) {
					console.log(error);
					logger.error("Error While Login using Google", {
						email: profile.emails[0].value,
					});
				}
			}
		)
	);
	passport.use(
		new GithubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/api/v1/auth/github/callback",
				scope: ["user:email"],
			},
			async function (accessToken, refreshToken, profile, done) {
				// console.log("GITHUB: ", profile);
				// done(null, profile);
				const userData = {
					name: profile.displayName,
					email: profile.emails[0].value,
					provider: "github",
					providerId: profile.id,
					profile: profile.photos[0].value,
				};
				// console.log("USERDB: ", userData);
				try {
					const user = await prisma.user.findUnique({
						where: { email: profile.emails[0].value },
					});
					// console.log(user);
					if (user) {
						done(null, user);
					} else {
						const newUser = await prisma.user.create({
							data: {
								...userData,
							},
						});
						// console.log(newUser);
						done(null, newUser);
					}
				} catch (error) {
					console.log(error);
					logger.error("Error While Login using Google", {
						email: profile.emails[0].value,
						error: error.message,
					});
				}
			}
		)
	);
};

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (user, done) => {
	try {
		const newUser = await prisma.user.findUnique({
			where: { email: user.email },
		});
		if (newUser) {
			done(null, user);
		}
	} catch (error) {
		logger.error("Error while De-serialized User", { email: user.email });
		done(error, null);
	}
});

export default initializePassport;
