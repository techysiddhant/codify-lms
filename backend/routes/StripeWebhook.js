import { Router } from "express";
import express from "express";
import CheckoutController from "../Controllers/CheckoutController.js";
import { Roles } from "../constants/index.js";
import passport from "passport";
import { canAccess } from "../middlewares/canAccess.js";
const router = Router();
router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	CheckoutController.stripeWebhook
);
export default router;
