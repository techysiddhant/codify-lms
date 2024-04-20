"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapters-list";
import {
	useCreateChapterMutation,
	useReorderChapterMutation,
} from "@/redux/slices/chapterApiSlice";

// import { ChaptersList } from "./chapters-list";
const formSchema = z.object({
	title: z.string().min(1),
});
const ChaptersForm = ({ initialData, courseId }) => {
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const toggleCreating = () => {
		setIsCreating((current) => !current);
	};

	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});
	const { isSubmitting, isValid } = form.formState;
	const [createChapter] = useCreateChapterMutation();

	const onSubmit = async (data) => {
		try {
			const chapter = await createChapter({ courseId: courseId, ...data });
			console.log(chapter);
			toast.success("Chapter Created Successfully");
			toggleEdit();
			router.refresh();
		} catch (error) {
			toast.error("Something went wrong");
		}
	};
	const [reorderChapters] = useReorderChapterMutation();
	const onReorder = async (list) => {
		// console.log(updateData);
		try {
			setIsUpdating(true);
			//LOGIC
			const data = await reorderChapters({ courseId: courseId, list });
			console.log(data);
			toast.success("Chapters reordered");
			router.refresh();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsUpdating(false);
		}
	};
	const onEdit = (id) => {
		router.push(`/creator/courses/${courseId}/chapters/${id}`);
	};
	return (
		<div className="relative mt-6 border bg-slate-100 rounded-md p-4">
			{isUpdating && (
				<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
					<Loader2 className="animate-spin h-6 w-6 text-sky-700" />
				</div>
			)}
			<div className="font-medium flex items-center justify-between">
				Course chapters
				<Button
					onClick={toggleCreating}
					variant="ghost"
				>
					{isCreating ? (
						<>Cancel</>
					) : (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a chapter
						</>
					)}
				</Button>
			</div>
			{isCreating && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Introduction to the course'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={!isValid || isSubmitting}
							type="submit"
						>
							Create
						</Button>
					</form>
				</Form>
			)}
			{!isCreating && (
				<div
					className={cn(
						"text-sm mt-2",
						!initialData?.chapters.length && "text-slate-500 italic"
					)}
				>
					{!initialData?.chapters.length && "No chapters"}
					<ChaptersList
						onEdit={onEdit}
						onReorder={onReorder}
						items={initialData?.chapters || []}
					/>
				</div>
			)}
			{!isCreating && (
				<p className="text-xs text-muted-foreground mt-4">
					Drag and drop to reorder the chapters
				</p>
			)}
		</div>
	);
};

export default ChaptersForm;
