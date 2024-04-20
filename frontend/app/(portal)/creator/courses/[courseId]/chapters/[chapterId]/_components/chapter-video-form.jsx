"use client";

import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useVideoUploadChapterMutation } from "@/redux/slices/chapterApiSlice";

const ChapterVideoForm = ({ initialData, courseId, chapterId }) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);
	const form = useForm({
		// resolver: zodResolver(formSchema),
	});
	const router = useRouter();
	const [uploadVideo] = useVideoUploadChapterMutation();
	const onSubmit = async (data) => {
		const formData = new FormData();
		console.log(data.video);
		formData.append("video", data?.video);
		formData.append("chapterId", chapterId);
		try {
			const data = await uploadVideo(formData).unwrap();
			console.log(data);
			// await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
			toast.success("Chapter updated");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Chapter video
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing && <>Cancel</>}
					{!isEditing && !initialData?.videoUrl && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a video
						</>
					)}
					{!isEditing && initialData?.videoUrl && (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit video
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData?.videoUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<Video className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video mt-2">
						<MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
					</div>
				))}
			{isEditing && (
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full p-10"
						>
							<FormField
								control={form.control}
								name="video"
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
					{/* <FileUpload
						endpoint="chapterVideo"
						onChange={(url) => {
							if (url) {
								onSubmit({ videoUrl: url });
							}
						}}
					/> */}
					<div className="text-xs text-muted-foreground mt-4">
						Upload this chapter&apos;s video
					</div>
				</div>
			)}
			{initialData?.videoUrl && !isEditing && (
				<div className="text-xs text-muted-foreground mt-2">
					Videos can take a few minutes to process. Refresh the page if video does
					not appear.
				</div>
			)}
		</div>
	);
};

export default ChapterVideoForm;
