import CoursePurchaseEmail from "@/emails/CoursePurchaseEmail";
import { resend } from "./resend";
export async function sendTransactionEmail({
	name,
	email,
	courseName,
}: {
	name: string | null | undefined;
	email: string | null | undefined;
	courseName: string;
}) {
	try {
		if (!name && !email) {
			//
			return;
		}
		const emailTemplate = CoursePurchaseEmail({
			userFirstname: name!,
			courseTitle: courseName,
		});
		// Send the email using the Resend API
		await resend.emails.send({
			from: "Codify <notifications@codify.siddhantjain.co.in>",
			to: email as string,
			subject: `You are now enrolled in - ${courseName}`,
			react: emailTemplate,
		});
	} catch (error) {
		// Log any errors and re-throw the error
		console.log({ error });
		throw error;
	}
}
