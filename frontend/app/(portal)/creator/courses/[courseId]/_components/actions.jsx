"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { usePublishCourseMutation } from "@/redux/slices/courseApiSlice";

const Actions = ({ disabled, courseId, isPublished }) => {
	const router = useRouter();
	const confetti = useConfettiStore();
	const [isLoading, setIsLoading] = useState(false);
	const [publishCourse, { isLoading: publishLoading }] =
		usePublishCourseMutation();
	const onClick = async () => {
		try {
			setIsLoading(true);

			if (!isPublished) {
				const ngb = await publishCourse(courseId);
				console.log(ngb);
				toast.success("Course published");
				confetti.onOpen();
				// await axios.patch(`/api/courses/${courseId}/unpublish`);
				// toast.success("Course unpublished");
			} else {
				// await axios.patch(`/api/courses/${courseId}/publish`);
				// toast.success("Course published");
				// confetti.onOpen();
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

			// await axios.delete(`/api/courses/${courseId}`);

			toast.success("Course deleted");
			router.refresh();
			router.push(`/teacher/courses`);
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
				disabled={disabled || isLoading || publishLoading || isPublished}
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

export default Actions;
