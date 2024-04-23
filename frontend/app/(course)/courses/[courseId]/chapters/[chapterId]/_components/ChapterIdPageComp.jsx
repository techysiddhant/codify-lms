"use client";
import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { useGetUserChapterQuery } from "@/redux/slices/chapterApiSlice";
import Banner from "@/components/banner";
import VideoPlayer from "./video-player";
import CourseProgressButton from "./course-progress-button";
import CourseEnrollButton from "./course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
const ChapterIdPageComp = ({ courseId, chapterId }) => {
	const { data } = useGetUserChapterQuery({ courseId, chapterId });
	console.log(data);
	console.log(!data?.attachments.length);
	// const {
	// 	chapter,
	// 	course,
	// 	muxData,
	// 	attachments,
	// 	nextChapter,
	// 	userProgress,
	// 	purchase,
	// } = data;
	const isLocked = !data?.chapter?.isFree && !data?.purchase;
	const completeOnEnd = !data?.purchase && !data?.userProgress?.isCompleted;
	// return <h1>heolloo</h1>;
	return (
		<div>
			{data?.userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="You already completed this chapter."
				/>
			)}
			{isLocked && (
				<Banner
					variant="warning"
					label="You need to purchase this course to watch this chapter."
				/>
			)}
			<div className="flex flex-col max-w-4xl mx-auto pb-20">
				<div className="p-4">
					<VideoPlayer
						chapterId={chapterId}
						title={data?.chapter?.title}
						courseId={courseId}
						nextChapterId={data?.nextChapter?.id}
						playbackId={data?.muxData?.playbackId}
						isLocked={isLocked}
						completeOnEnd={completeOnEnd}
					/>
				</div>
				<div>
					<div className="p-4 flex flex-col md:flex-row items-center justify-between">
						<h2 className="text-2xl font-semibold mb-2">{data?.chapter?.title}</h2>
						{data?.purchase ? (
							<CourseProgressButton
								chapterId={chapterId}
								courseId={courseId}
								nextChapterId={data?.nextChapter?.id}
								isCompleted={!data?.userProgress?.isCompleted}
							/>
						) : (
							<CourseEnrollButton
								courseId={courseId}
								price={data?.course?.price}
							/>
						)}
					</div>
					<Separator />
					<div>
						<Preview value={data?.chapter?.description} />
					</div>
					{data?.attachments.length && (
						<>
							<Separator />
							<div className="p-4">
								{data?.attachments?.map((attachment) => (
									<a
										href={attachment.url}
										target="_blank"
										key={attachment.id}
										className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
									>
										<File />
										<p className="line-clamp-1">{attachment.name}</p>
									</a>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChapterIdPageComp;
