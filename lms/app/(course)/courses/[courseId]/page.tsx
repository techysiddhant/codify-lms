import { getCourseByCourseId } from "@/actions/user.actions";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
	const session: CustomSession | null = await getServerSession(authOptions);
	const user = session?.user;

	const course = await getCourseByCourseId({
		userId: user?.id!,
		courseId: params?.courseId,
	});
	if (!course) {
		return redirect("/");
	}
	return (
		<div className="h-full">
			<div className="flex items-center justify-center h-full my-5">
				<Button asChild>
					<Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`}>
						Continue to the Course
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default CoursePage;
