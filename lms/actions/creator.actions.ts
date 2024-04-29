"use server";

import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export default async function fetchCreatorCourses() {
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session) {
		return null;
	}
	if (session?.user?.role !== "CREATOR") {
		return null;
	}
	try {
		const courses = await db.course.findMany({
			where: {
				userId: session?.user?.id!,
			},
		});
		return courses;
	} catch (error) {}
}
export async function fetchCreatorCourse(courseId: string) {
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session) {
		return null;
	}
	if (session?.user?.role !== "CREATOR") {
		return null;
	}
	try {
		const courses = await db.course.findUnique({
			where: {
				userId: session?.user?.id!,
				id: courseId,
			},
			include: {
				chapters: {
					orderBy: {
						position: "asc",
					},
				},
			},
		});
		return courses;
	} catch (error) {}
}
export async function fetchCreatorCourseChapterById(chapterId: string) {
	const session: CustomSession | null = await getServerSession(authOptions);
	if (!session) {
		return null;
	}
	if (session?.user?.role !== "CREATOR") {
		return null;
	}
	try {
		const courses = await db.chapter.findUnique({
			where: {
				userId: session?.user?.id!,
				id: chapterId,
			},
			include: {
				muxData: true,
				attachments:true
			},
		});
		return courses;
	} catch (error) {}
}
