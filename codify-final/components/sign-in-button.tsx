"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
export const SignInButton = () => {
	const { data: session } = useSession();
	if (session && session.user) {
		return (
			<div>
				<p className="">{session.user.name}</p>
				<Button onClick={() => signOut()}>Sign Out</Button>
			</div>
		);
	}
	return <Button onClick={() => signIn()}>Sign In</Button>;
};

// default SignInButton;
