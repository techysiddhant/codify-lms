"use client";
import { useGetUserCourseQuery } from "@/redux/slices/courseApiSlice";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";
import { redirect } from "next/navigation";
import { useGetUserProgressQuery } from "@/redux/slices/chapterApiSlice";
const CourseLayout = ({ children, params }) => {
	const { data: course } = useGetUserCourseQuery(params?.courseId);
	const { data: progressCount } = useGetUserProgressQuery(params?.courseId);
	// console.log("COURSE: ", course);
	// console.log("PROGRESS COUNT: ", progressCount);
	// if (!course) {
	// 	return redirect("/");
	// }

	// const progressCount = await getProgress(userId, course.id);
	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
				<CourseNavbar
					course={course}
					progressCount={progressCount}
				/>
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
				<CourseSidebar
					course={course}
					progressCount={progressCount}
				/>
			</div>
			<main className="md:pl-80 pt-[80px] h-full">{children}</main>
		</div>
	);
};

export default CourseLayout;
