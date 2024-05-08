"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Env from "@/lib/env";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
export const LoginButton = () => {
	const onSubmit = async () => {
		const result = await signIn("google", {
			callbackUrl: Env.NEXT_PUBLIC_APP_URL,
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Sign In</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">
						<div className="space-y-4">
							<h3 className="font-medium text-xl text-secondary-foreground">
								Let's get Started!
							</h3>
							<h2 className="text-3xl font-semibold text-primary">Sign In Here!</h2>
						</div>
					</DialogTitle>
					<DialogDescription>
						{/* Make changes to your profile here. Click save when you&apos;re done. */}
					</DialogDescription>
				</DialogHeader>
				<div>
					<Button
						onClick={onSubmit}
						// variant="outline"
						type="button"
						className="w-full "
					>
						<FcGoogle className="block text-2xl bg-white h-9 w-9 p-1 rounded" />{" "}
						<span className="text-xl pl-2 ">Continue with Google</span>
					</Button>
				</div>
				<DialogFooter>
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href=""
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href=""
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
