import Stripe from "stripe";
import Env from "./env";

export const stripe = new Stripe(Env.STRIPE_API_KEY!, {
	apiVersion: "2024-04-10",
	typescript: true,
});
