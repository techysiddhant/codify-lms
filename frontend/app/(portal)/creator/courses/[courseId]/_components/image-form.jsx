"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
// import { FileUpload } from "@/components/file-upload";
const formSchema = z.object({
	image: z.instanceof(FileList),
});
const ImageForm = ({ initialData, courseId }) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(formSchema),
	});
	const imageRef = form.register("image");
	const onSubmit = (data) => {
		console.log(data);
		try {
		} catch (error) {
			toast.error("Something went wrong");
		}
	};
	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course image
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing && <>Cancel</>}
					{!isEditing && !initialData?.imageUrl && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add an image
						</>
					)}
					{!isEditing && initialData?.imageUrl && (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit image
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData?.imageUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<ImageIcon className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video mt-2">
						<Image
							alt="Upload"
							fill
							className="object-cover rounded-md"
							src={initialData?.imageUrl}
						/>
					</div>
				))}
			{isEditing && (
				<div>
					{/* <FileUpload
						endpoint="courseImage"
						onChange={(url) => {
							if (url) {
								onSubmit({ imageUrl: url });
							}
						}}
					/> */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full p-10"
						>
							<FormField
								control={form.control}
								name="image"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>File</FormLabel>
											<FormControl>
												<Input
													type="file"
													placeholder="shadcn"
													accept="image/png, image/jpeg"
													{...imageRef}
													onChange={(event) => {
														field.onChange(event.target?.files?.[0]);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
					<div className="text-xs text-muted-foreground mt-4">
						16:9 aspect ratio recommended
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageForm;
