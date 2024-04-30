import Stripe from "stripe";
import Env from "./env";

export const stripe = new Stripe(Env.STRIPE_API_KEY!, {
	apiVersion: "2022-11-15",
	typescript: true,
});
