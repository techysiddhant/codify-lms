import prisma from "../config/db.config.js";
import { Config } from "../config/index.js";
import { stripe } from "../utils/stripe.js";
class CheckoutController {
	static async checkoutCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const user = req.user;
			const course = await prisma.course.findUnique({
				where: { id: courseId, isPublished: true },
			});
			if (!course) {
				return res.status(400).json({ errors: [{ error: "Course Not Found!" }] });
			}
			const purchase = await prisma.purchase.findUnique({
				where: {
					userId_courseId: {
						userId: 1,
						courseId: courseId,
					},
				},
			});
			if (purchase) {
				return res
					.status(401)
					.json({ errors: [{ error: "You already purchased this course!" }] });
			}

			const line_items = [
				{
					quantity: 1,
					price_data: {
						currency: "inr",
						product_data: {
							name: course.title,
							description: course.description,
						},
						unit_amount: Math.round(course.price * 100),
					},
				},
			];
			let stripeCustomer = await prisma.stripeCustomer.findUnique({
				where: {
					//FIXME: fix the user id
					userId: 1,
				},
				select: {
					stripeCustomerId: true,
				},
			});
			if (!stripeCustomer) {
				const customer = await stripe.customers.create({
					//FIXME: user email
					// email:user.email
					email: "dearcrush.you@gmail.com",
				});
				stripeCustomer = await prisma.stripeCustomer.create({
					data: {
						userId: 1,
						stripeCustomerId: customer.id,
					},
				});
			}
			const session = await stripe.checkout.sessions.create({
				customer: stripeCustomer.stripeCustomerId,
				line_items,
				mode: "payment",
				success_url: "http://localhost:5000/success",
				cancel_url: "http://localhost:5000/fail",
				metadata: {
					courseId: course.id,
					//FIXME: fix user id
					// userId:user.id
					userId: 1,
				},
			});
			return res.status(201).json({ url: session.url });
		} catch (error) {
			next(error);
		}
	}
	static async stripeWebhook(req, res, next) {
		let event;
		let signature = req.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				Config.STRIPE_WEBHOOK_SECRET
			);
		} catch (error) {
			next(error);
		}
		const session = event.data.object;
		const userId = session?.metadata?.userId;
		const courseId = session?.metadata?.courseId;
		if (event.type === "checkout.session.completed") {
			if (!userId || !courseId) {
				return res.status(400).json({ message: "Meta data missing!" });
			}

			await prisma.purchase.create({
				data: {
					courseId: courseId,
					userId: userId,
				},
			});
		} else {
			return res
				.status(200)
				.json({ message: "unhandled event type", event: event.type });
		}

		return res.status(200).json(null);
	}
}

export default CheckoutController;
