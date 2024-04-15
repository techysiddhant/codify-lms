import { Router } from "express";
import passport from "passport";
import AuthController from "../Controllers/AuthController.js";
import userSignupValidator from "../validators/user-signup-validator.js";
import userLoginValidator from "../validators/user-login-validator.js";
const router = Router();
router.post(
	"/signup",
	userSignupValidator,
	// passport.authenticate("jwt", { session: false }),
	AuthController.register
);
router.post(
	"/login",
	userLoginValidator,
	passport.authenticate("jwt", { session: false }),
	AuthController.login
);
export default router;
