import { Router } from "express";
import CheckoutController from "../Controllers/CheckoutController.js";
import { Roles } from "../constants/index.js";
import passport from "passport";
import { canAccess } from "../middlewares/canAccess.js";
const router = Router();
router.post("/checkout/:courseId", CheckoutController.checkoutCourse);
router.post("/webhook", CheckoutController.stripeWebhook);
router.get(
	"/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.USER]),
	CheckoutController.GetCoursePurchase
);
export default router;
