import WelcomeEmail from "@/emails/WelcomeEmail";
import { resend } from "./resend";
export async function sendWelcomeEmail({
	name,
	email,
}: {
	name: string | null | undefined;
	email: string | null | undefined;
}) {
	try {
		if (!name && !email) {
			//
			return;
		}
		const emailTemplate = WelcomeEmail({ userFirstname: name! });
		// Send the email using the Resend API
		await resend.emails.send({
			from: "Codify <hello@codify.siddhantjain.co.in>",
			to: email as string,
			subject: "Welcome to Codify!",
			react: emailTemplate,
		});
	} catch (error) {
		// Log any errors and re-throw the error
		console.log({ error });
		throw error;
	}
}
