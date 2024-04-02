import passport from "passport";
// import { googleStrategy } from "passport-google-oauth20";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";

// const GoogleStrategy = new googleStrategy().Strategy;

const initializePassport = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
			},
			function (accessToken, refreshToken, profile, done) {
				console.log(profile);
				const userData = {
					googleId: profile.id,
					displayName: profile.displayName,
					email: profile.emails[0].value,
					roles: ["user"], // Set default role(s) for the user
					// Add any additional data you want to save
				};
				return done(null, userData);
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
			function (accessToken, refreshToken, profile, done) {
				console.log("GITHUB: ", profile);
				done(null, profile);
			}
		)
	);
};

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

export default initializePassport;
