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
						userId: user.id,
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
					userId: user.id,
				},
				select: {
					stripeCustomerId: true,
				},
			});
			if (!stripeCustomer) {
				const customer = await stripe.customers.create({
					//FIXME: user email
					// email:user.email
					email: user.email,
				});
				stripeCustomer = await prisma.stripeCustomer.create({
					data: {
						userId: user.id,
						stripeCustomerId: customer.id,
					},
				});
			}
			const session = await stripe.checkout.sessions.create({
				customer: stripeCustomer.stripeCustomerId,
				line_items,
				mode: "payment",
				success_url: `http://localhost:3000/courses/${course.id}?success=1`,
				cancel_url: `http://localhost:3000/courses/${course.id}?canceled=1`,
				metadata: {
					courseId: course.id,
					//FIXME: fix user id
					// userId:user.id
					userId: user.id,
				},
			});
			return res.status(201).json(session.url);
		} catch (error) {
			next(error);
		}
	}
	static async stripeWebhook(req, res, next) {
		const signature = req.headers["stripe-signature"];
		let event;
		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				Config.STRIPE_WEBHOOK_SECRET
			);
		} catch (error) {
			// console.log(error);
			res.status(400).send(`Webhook Error: ${error.message}`);
			return;
			// next(error);
		}
		// switch (event.type) {
		// 	case "checkout.session.completed":
		// 		const paymentIntentSucceeded = event.data.object;
		// 		// console.log("pay-in :", paymentIntentSucceeded);
		// 		const userId = paymentIntentSucceeded.metadata.userId;
		// 		const courseId = paymentIntentSucceeded.metadata.courseId;
		// 		// console.log("userID :", userId);
		// 		// Then define and call a function to handle the event payment_intent.succeeded
		// 		if (event.type === "checkout.session.completed") {
		// 			if (!userId || !courseId) {
		// 				res.status(400).json({ message: "Meta data missing!" });
		// 				break;
		// 			}
		// 			await prisma.purchase.create({
		// 				data: {
		// 					courseId: courseId,
		// 					userId: parseInt(userId),
		// 				},
		// 			});
		// 		} else {
		// 			res
		// 				.status(200)
		// 				.json({ message: "unhandled event type", event: event.type });
		// 			break;
		// 		}
		// 		res.status(200).json(null);
		// 		break;
		// 	// ... handle other event types
		// 	default:
		// 		console.log(`Unhandled event type ${event.type}`);
		// }
		// console.log(event);
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
					userId: parseInt(userId),
				},
			});
		} else {
			return res
				.status(200)
				.json({ message: "unhandled event type", event: event.type });
		}

		return res.status(200).json(null);
	}
	static async GetCoursePurchase(req, res, next) {
		try {
			const user = req.user;
			const { courseId } = req.params;
			const purchase = await prisma.purchase.findUnique({
				where: {
					userId_courseId: {
						userId: user.id,
						courseId,
					},
				},
			});
			return res.status(200).json(purchase);
		} catch (error) {
			next(error);
		}
	}
}

export default CheckoutController;
