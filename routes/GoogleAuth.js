import { Router } from "express";
import passport from "passport";
const router = Router();
const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";
router.get(
	"/login/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureMessage: "Cannot Login to google, Try Again!",
		failureRedirect: errorLoginUrl,
		// successRedirect: successLoginUrl,
	}),
	(req, res) => {
		// console.log("User: ", req.user);
		res.json({ user: req.user });
	}
);
export default router;
