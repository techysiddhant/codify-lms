import { getDraftCourseByCourseId } from "@/actions/creator.actions";
import { CourseEnrollButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button";
import { CourseButton } from "@/app/(portal)/course/[courseId]/_components/course-button";
import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/format";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DraftCoursePage = async ({
	params,
}: {
	params: { courseId: string };
}) => {
	const course = await getDraftCourseByCourseId({ courseId: params?.courseId });
	return (
		<>
			<Banner label="This is a Draft view of the Course Details Page For Creator Only." />
			<div className="p-2">
				<Link
					href={`/creator/courses/${params?.courseId}`}
					className="flex items-center text-sm hover:opacity-75 transition mb-6"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to course setup
				</Link>
			</div>
			<div className="h-full w-full flex flex-col  px-6 gap-4">
				<div className="flex flex-col-reverse md:flex-row justify-between items-start">
					<div className="p-4 space-y-2 w-full md:w-[60%]">
						<h1 className="text-4xl font-bold tracking-wider capitalize">
							{course?.title}
						</h1>
						<h2 className="text-2xl font-medium">{course?.shortDescription}</h2>
						<h3 className="text-lg font-medium">
							Category :{" "}
							<span className="bg-primary text-secondary p-1 text-sm rounded">
								{course?.category?.name}
							</span>
						</h3>
						{/* <p>createdBy :</p> */}
						<div className="mb-1">
							<p className="text-muted-foreground text-sm">Created By:</p>
							<div className="flex items-center gap-x-4 my-1">
								<Avatar>
									<AvatarImage
										src={course?.creator?.image!}
										alt="@shadcn"
									/>
									<AvatarFallback>PIC</AvatarFallback>
								</Avatar>
								<h3 className="text-primary font-medium capitalize">
									{course?.creator?.displayName!}
								</h3>
							</div>
						</div>
						<p>Last updated {formatDate(course?.updatedAt!)}</p>
						<div className="flex flex-col gap-4">
							<CourseButton id={course?.id!} />
							<CourseEnrollButton
								courseId={course?.id!}
								price={course?.price!}
							/>
						</div>
					</div>
					<div className="relative aspect-video mt-2 w-full md:w-[40%]">
						<Image
							alt="image"
							fill
							className="object-cover rounded-md"
							src={course?.imageUrl!}
						/>
					</div>
				</div>
				<div className="w-full h-full  bg-secondary rounded p-2">
					<h1 className="text-2xl font-bold tracking-wider capitalize text-left">
						Course Details
					</h1>
					<div className="">
						<Preview value={course?.description!} />
					</div>
				</div>
				<div className="my-4">
					<h2 className="text-2xl font-bold text-secondary-foreground">
						Instructor
					</h2>
					<div className="">
						<Avatar className="w-[150px] h-[150px]">
							<AvatarImage
								src={course?.creator?.image!}
								alt="creator-image"
							/>
							<AvatarFallback>PIC</AvatarFallback>
						</Avatar>
					</div>
					<h3 className="text-2xl text-primary font-bold capitalize tracking-wide">
						{course?.creator?.displayName}
					</h3>
					<p className="my-1 text-lg font-medium text-secondary-foreground tracking-wide">
						{course?.creator?.description}
					</p>
				</div>
			</div>
		</>
	);
};

export default DraftCoursePage;
