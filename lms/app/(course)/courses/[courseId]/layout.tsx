import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { getCourseByCourseId, getProgress } from "@/actions/user.actions";
import { getServerSession } from "next-auth/next";
import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";

const CourseLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { courseId: string };
}) => {
	const session: CustomSession | null = await getServerSession(authOptions);
	const user = session?.user;
	if (!user) {
		return redirect("/");
	}
	const course = await getCourseByCourseId({
		courseId: params?.courseId,
		userId: user?.id!,
	});
	if (!course) {
		return redirect("/");
	}

	const progressCount = await getProgress(user?.id!, params?.courseId);
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
