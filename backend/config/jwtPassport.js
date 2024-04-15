import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "./db.config.js";
import { Config } from "./index.js";
export const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: Config.JWT_SECRET, // Replace with your own secret key
};
// Configure Passport JWT strategy
const initializeJwt = () => {
	passport.use(
		new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
			try {
				const user = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				return done(error, false);
			}
		})
	);
};

export default initializeJwt;
