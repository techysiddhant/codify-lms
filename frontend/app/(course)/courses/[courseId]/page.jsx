"use client";
import { redirect } from "next/navigation";
import { useGetUserCourseQuery } from "@/redux/slices/courseApiSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const page = ({ params }) => {
	console.log(params.courseId);
	const { data: course } = useGetUserCourseQuery(params?.courseId);
	const router = useRouter();
	// console.log(course);
	// if (!course) {
	// 	return redirect("/");
	// }
	useEffect(() => {
		// redirect(`/courses/${course?.id}/chapters/${course?.chapters[0].id}`);
		router.push(`/courses/${course?.id}/chapters/${course?.chapters[0].id}`);
	}, [course]);

	// return redirect(`/courses/${course?.id}/chapters/${course?.chapters[0].id}`);
	return <h1 className="">heyy</h1>;
};

export default page;
