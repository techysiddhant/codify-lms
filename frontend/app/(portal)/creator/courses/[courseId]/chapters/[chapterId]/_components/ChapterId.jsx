"use client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

// import { db } from "@/lib/db";
import IconBadge from "@/components/icon-badge";
import Banner from "@/components/banner";
import ChapterTitleForm from "./chapter-title-form";
import ChapterDescriptionForm from "./chapter-description-form";
import ChapterAccessForm from "./chapter-access-form";
import ChapterVideoForm from "./chapter-video-form";
import { useGetChapterQuery } from "@/redux/slices/chapterApiSlice";

const ChapterId = ({ chapterId, courseId }) => {
	const { data: chapter } = useGetChapterQuery({ chapterId: chapterId });
	// console.log(chapter);
	// const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
	// const totalFields = requiredFields.length;
	// const completedFields = requiredFields.filter(Boolean).length;

	// const completionText = `(${completedFields}/${totalFields})`;

	// const isComplete = requiredFields.every(Boolean);
	return (
		<>
			{!chapter?.isPublished && (
				<Banner
					variant="warning"
					label="This chapter is unpublished. It will not be visible in the course"
				/>
			)}
			<div className="p-6">
				<div className="flex items-center justify-between">
					<div className="w-full">
						<Link
							href={`/creator/courses/${courseId}`}
							className="flex items-center text-sm hover:opacity-75 transition mb-6"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to course setup
						</Link>
						<div className="flex items-center justify-between w-full">
							<div className="flex flex-col gap-y-2">
								<h1 className="text-2xl font-medium">Chapter Creation</h1>
								<span className="text-sm text-slate-700">
									{/* Complete all fields {completionText} */}
								</span>
							</div>
							{/* <ChapterActions
								disabled={!isComplete}
								courseId={params?.courseId}
								chapterId={params?.chapterId}
								isPublished={chapter?.isPublished}
							/> */}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					<div className="space-y-4">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={LayoutDashboard} />
								<h2 className="text-xl">Customize your chapter</h2>
							</div>
							<ChapterTitleForm
								initialData={chapter}
								courseId={courseId}
								chapterId={chapterId}
							/>
							<ChapterDescriptionForm
								initialData={chapter}
								courseId={courseId}
								chapterId={chapterId}
							/>
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={Eye} />
								<h2 className="text-xl">Access Settings</h2>
							</div>
							<ChapterAccessForm
								initialData={chapter}
								courseId={courseId}
								chapterId={chapterId}
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={Video} />
							<h2 className="text-xl">Add a video</h2>
						</div>
						<ChapterVideoForm
							initialData={chapter}
							chapterId={chapterId}
							courseId={courseId}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChapterId;
