"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Creator } from "@prisma/client";
import { UploadButton } from "@/lib/uploadthing";
import { ImageIcon, User } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
	firstName: z.string().min(1, {
		message: "First Name is required",
	}),
	lastName: z.string().min(1, {
		message: "Last Name is required",
	}),
	displayName: z.string().min(1, {
		message: "Display Name is required",
	}),
	description: z.string().min(50, {
		message: "Description is required",
	}),
	terms: z.boolean(),
	image: z.string().optional(),
});
const imageSchema = z.object({
	image: z.string().min(1, {
		message: "Image Required!",
	}),
});
export const CreatorOnBoardingForm = ({
	profileData,
}: {
	profileData: Creator;
}) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: profileData ? profileData?.firstName : "",
			lastName: profileData ? profileData?.lastName : "",
			displayName: profileData ? profileData?.displayName : "",
			description: profileData ? profileData?.description : "",
			terms: profileData ? profileData?.terms : false,
			image: profileData?.image || "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (!profileData) {
				const response = await axios.post("/api/onboarding", values);
				router.push(`/?message=${"success!!!!!!"}`);
				toast.success("Thank you for applying Check you email for verified!");
			} else {
				const response = await axios.patch(
					`/api/onboarding/${profileData.id}`,
					values
				);
				// router.push(`/?message=${"success!!!!!!"}`);
				toast.success("profile update Successfully!");
				router.refresh();
			}
		} catch {
			toast.error("Something went wrong");
		}
	};
	const onImageSubmit = async (values: z.infer<typeof imageSchema>) => {
		try {
			await axios.patch(`/api/onboarding`, {
				id: profileData?.id,
				image: values.image,
			});
			toast.success("Course updated");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		}
	};
	return (
		<div className="max-w-5xl  mx-auto flex md:items-center md:justify-center h-full p-6">
			<div className="w-full md:px-10">
				<h1 className="text-2xl">
					{profileData?.id ? "Creator Details" : "Sign up as an creator"}
				</h1>
				<p className="text-sm text-slate-600">Build and sell coding courses</p>
				{profileData?.image && (
					<div className="w-[150px] h-[150px] rounded-full  border  my-2">
						<Image
							alt="profile-picture"
							width={150}
							height={150}
							className="rounded-full object-cover"
							src={profileData?.image}
						/>
					</div>
				)}
				<div className="flex w-full gap-2 flex-col items-start justify-start mt-8">
					<div className="">
						<h2 className="font-medium">Upload a display picture</h2>
					</div>
					<UploadButton
						className=""
						endpoint="creatorImage"
						onClientUploadComplete={(res) => {
							onImageSubmit({ image: res[0].url });
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							// alert(`ERROR! ${error.message}`);
							toast.error("Something went wrong try again");
						}}
					/>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8  "
					>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Creator First Name</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="John"
											{...field}
											className=""
										/>
									</FormControl>
									{/* <FormDescription>What will you teach in this course?</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Creator Last Name</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="Doe"
											{...field}
										/>
									</FormControl>
									{/* <FormDescription>What will you teach in this course?</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="displayName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Creator Display Name</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									{/* <FormDescription>What will you teach in this course?</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Creator Description</FormLabel>
									<FormControl>
										<Textarea
											disabled={isSubmitting}
											placeholder="e.g. 'about your self...'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									{/* <FormLabel>Creator Description</FormLabel> */}
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormDescription>Accept terms and conditions</FormDescription>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Link href="/">
								<Button
									type="button"
									variant="ghost"
								>
									Cancel
								</Button>
							</Link>
							<Button
								type="submit"
								disabled={!isValid || isSubmitting}
							>
								{!profileData ? "Continue" : "Update"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};
