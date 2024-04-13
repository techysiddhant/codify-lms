import { Router } from "express";
import CheckoutController from "../Controllers/CheckoutController.js";
const router = Router();
router.post("/checkout/:courseId", CheckoutController.checkoutCourse);
router.post("/webhook", CheckoutController.stripeWebhook);
export default router;
