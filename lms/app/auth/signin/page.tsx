import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

const SignInPage = async () => {
	const session = await getServerSession(authOptions);
	// console.log(session);
	return (
		<div>
			<h1 className="">{"sid"}</h1>
		</div>
	);
};

export default SignInPage;
