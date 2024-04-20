"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import {
	useDeleteChapterMutation,
	usePublishChapterMutation,
	useUnPublishChapterMutation,
} from "@/redux/slices/chapterApiSlice";

const ChapterActions = ({ disabled, courseId, chapterId, isPublished }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [publishChapter, { isLoading: publishLoading }] =
		usePublishChapterMutation();
	const [unPublishChapter, { isLoading: unPublishLoading }] =
		useUnPublishChapterMutation();
	const [deleteChapter] = useDeleteChapterMutation();
	const onClick = async () => {
		try {
			setIsLoading(true);

			if (isPublished) {
				await unPublishChapter(chapterId);
				// await axios.patch(
				// 	`/api/courses/${courseId}/chapters/${chapterId}/unpublish`
				// );
				toast.success("Chapter unpublished");
			} else {
				// await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
				const dbp = await publishChapter(chapterId);
				console.log(dbp);
				toast.success("Chapter published");
			}

			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			const dts = await deleteChapter(chapterId);
			console.log(dts);
			// await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

			toast.success("Chapter deleted");
			router.refresh();
			router.push(`/creator/courses/${courseId}`);
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex items-center gap-x-2">
			<Button
				onClick={onClick}
				disabled={disabled || isLoading || publishLoading || unPublishLoading}
				variant="outline"
				size="sm"
			>
				{isPublished ? "Unpublish" : "Publish"}
			</Button>
			<ConfirmModal onConfirm={onDelete}>
				<Button
					size="sm"
					disabled={isLoading}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};

export default ChapterActions;
