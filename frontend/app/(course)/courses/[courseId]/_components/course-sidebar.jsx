"use client";
import { useGetUserPurchaseQuery } from "@/redux/slices/paymentApiSlice";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

const CourseSidebar = ({ course, progressCount }) => {
	const { data: purchase } = useGetUserPurchaseQuery(course?.id);
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			<div className="p-8 flex flex-col border-b">
				<h1 className="font-semibold">{course?.title}</h1>
				{purchase && (
					<div className="mt-10">
						<CourseProgress
							variant="success"
							value={progressCount ? progressCount : 0}
						/>
					</div>
				)}
			</div>
			<div className="flex flex-col w-full">
				{course?.chapters?.map((chapter) => (
					<CourseSidebarItem
						key={chapter.id}
						id={chapter.id}
						label={chapter.title}
						isCompleted={!!chapter?.userProgress?.[0]?.isCompleted}
						courseId={course?.id}
						isLocked={!chapter?.isFree && !purchase}
					/>
				))}
			</div>
		</div>
	);
};

export default CourseSidebar;
