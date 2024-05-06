class Env {
	static GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID!;
	static GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET!;
	static NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET!;
	static NEXTAUTH_URL: string = process.env.NEXTAUTH_URL!;
	static MUX_TOKEN_ID: string = process.env.MUX_TOKEN_ID!;
	static MUX_TOKEN_SECRET: string = process.env.MUX_TOKEN_SECRET!;
	static STRIPE_API_KEY: string = process.env.STRIPE_API_KEY!;
	static NEXT_PUBLIC_APP_URL: string = process.env.NEXT_PUBLIC_APP_URL!;
	static STRIPE_WEBHOOK_SECRET: string = process.env.STRIPE_WEBHOOK_SECRET!;
	static RESEND_API_KEY: string = process.env.RESEND_API_KEY!;
}
export default Env;
