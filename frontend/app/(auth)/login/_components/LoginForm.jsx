import { Button } from "@/components/ui/button";
import React from "react";

const LoginForm = () => {
	return (
		<div className="flex justify-center items-center h-screen w-full px-4">
			<div className="w-full max-w-[350px] h-full max-h-[400px] border border-zinc-300 rounded flex flex-col justify-center items-center p-4 gap-3">
				<h1 className="text-2xl font-semibold ">Welcome to Codify</h1>
				<h2>Sign Up </h2>
				<Button className="w-full bg-blue-600 hover:bg-blue-600/80">
					Continue with Google
				</Button>
				<p>OR</p>
				<Button className="w-full">Continue with Github</Button>
				<span className="block h-[1px] bg-zinc-300 w-full"></span>
				<p className=" text-center text-sm px-4 mt-2">
					By clicking Login with Google or Login with GitHub, you agree to our Terms
					of Service and have read and acknowledge our Privacy Statement.
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
