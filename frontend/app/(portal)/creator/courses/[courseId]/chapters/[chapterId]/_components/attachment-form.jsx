"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
	useAddAttachmentMutation,
	useRemoveAttachmentMutation,
} from "@/redux/slices/chapterApiSlice";

const AttachmentForm = ({ initialData, chapterId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [deletingId, setDeletingId] = useState(null);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();
	const form = useForm();
	const [addAttachment] = useAddAttachmentMutation();
	const [removeAttachment] = useRemoveAttachmentMutation();
	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append("file", data?.file);
		formData.append("chapterId", chapterId);
		try {
			const data = await addAttachment(formData);
			console.log(data);
			toast.success("Course updated");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		}
	};
	const onDelete = async (id) => {
		console.log("ID: ", id);
		try {
			setDeletingId(id);
			const data = await removeAttachment(id);
			toast.success("Attachment deleted");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setDeletingId(null);
		}
	};
	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course attachments
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing && <>Cancel</>}
					{!isEditing && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a file
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<>
					{initialData?.attachments.length === 0 && (
						<p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>
					)}
					{initialData?.attachments.length > 0 && (
						<div className="space-y-2">
							{initialData?.attachments.map((at) => (
								<div
									key={at?.id}
									className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
								>
									<File className="h-4 w-4 mr-2 flex-shrink-0" />
									<p className="text-xs line-clamp-1">{at?.name}</p>
									{deletingId === at?.id && (
										<div>
											<Loader2 className="h-4 w-4 animate-spin" />
										</div>
									)}
									{deletingId !== at?.id && (
										<button
											onClick={() => onDelete(at?.id)}
											className="ml-auto hover:opacity-75 transition"
										>
											<X className="h-4 w-4" />
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</>
			)}
			{isEditing && (
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full p-10"
						>
							<FormField
								control={form.control}
								name="file"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>File</FormLabel>
											<FormControl>
												<Input
													type="file"
													placeholder="shadcn"
													// accept="image/png, image/jpeg"
													// {...imageRef}
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
						Add anything your students might need to complete the course.
					</div>
				</div>
			)}
		</div>
	);
};

export default AttachmentForm;
