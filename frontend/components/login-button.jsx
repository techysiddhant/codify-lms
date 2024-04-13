import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useLoginMutation } from "@/redux/slices/userApiSlice";

const LoginButton = () => {
	const [login] = useLoginMutation();

	const handleGoogleLogin = () => {
		const { data } = login();
		console.log(data);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Sign Up</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sign Up to Codify.io</DialogTitle>
					<DialogDescription>
						Sign up with your account to use platform
					</DialogDescription>
				</DialogHeader>
				<div>
					<Button
						onClick={handleGoogleLogin}
						className="w-full bg-blue-600 hover:bg-blue-600/80"
					>
						Continue with Google
					</Button>
					<p className="text-center my-1">OR</p>
					<Button className="w-full">Continue with Github</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LoginButton;
