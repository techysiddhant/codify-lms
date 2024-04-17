"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/slices/userApiSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login, setRole, setToken } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/persist";

const FormSchema = z.object({
	email: z.string().email({
		message: "Enter a valid Email",
	}),
	password: z.string().min(8, {
		message: "Password length shoubld be more then 8",
	}),
});
const LoginForm = () => {
	const [userlogin] = useLoginMutation();
	const dispatch = useDispatch();
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (data) => {
		console.log(data);
		try {
			const { user, token } = await userlogin({ ...data }).unwrap();
			console.log(user);
			dispatch(login(user));
			dispatch(setToken(token));
			dispatch(setRole(user.role));
			router.push("/");
		} catch (error) {
			console.log(error);
			if (error.data.errors.length > 0) {
				error?.data?.errors?.map((ele) => toast(ele.error));
				// toast(error.data.errors[0].error);
			} else {
				toast("Something Went Wrong");
			}
		}
	};
	return (
		<div className="flex justify-center items-center h-screen w-full px-4">
			<div className="w-full max-w-[350px] h-full max-h-[450px] border border-zinc-300 rounded flex flex-col justify-center items-center p-4 gap-3">
				<h1 className="text-2xl font-semibold ">Welcome to Codify</h1>
				<h2>Login </h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enter Email</FormLabel>
									<FormControl>
										<Input
											placeholder="enter your email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enter Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
						>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LoginForm;
