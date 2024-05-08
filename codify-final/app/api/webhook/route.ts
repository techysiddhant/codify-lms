import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendTransactionEmail } from "@/lib/send-transaction";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("stripe-signature") as string;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	} catch (error: any) {
		console.log(error);
		return new Response(`Webhook Error: ${error.message}`, { status: 400 });
	}
	const session = event.data.object as Stripe.Checkout.Session;
	const userId = session?.metadata?.userId;
	const courseId = session?.metadata?.courseId;

	if (event.type === "checkout.session.completed") {
		const amount = session?.amount_total! / 100;
		if (!userId || !courseId) {
			return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
		}

		await db.purchase.create({
			data: {
				courseId: courseId,
				userId: userId,
				amount: amount,
			},
		});
		const user = await db.user.findUnique({
			where: { id: userId },
		});
		const course = await db.course.findUnique({
			where: { id: courseId },
		});
		if (user && course) {
			await sendTransactionEmail({
				name: user.name,
				email: user.email,
				courseName: course.title,
			});
		}
	} else {
		return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, {
			status: 200,
		});
	}

	return new NextResponse(null, { status: 200 });
}
