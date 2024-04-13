import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
	"/login/github",
	passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
	"/github/callback",
	passport.authenticate("github", {
		failureMessage: "Cannot Login to google, Try Again!",
		failureRedirect: "errorLoginUrl",
		// successRedirect: successLoginUrl,
	}),
	(req, res) => {
		// console.log("User: ", req.user);
		res.json({ user: req.user });
	}
);
export default router;
