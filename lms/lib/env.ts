class Env {
	static GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID!;
	static GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET!;
	static NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET!;
	static NEXTAUTH_URL: string = process.env.NEXTAUTH_URL!;
}
export default Env;
