import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		if (!session) {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (session?.user?.role !== "CREATOR") {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userId = session?.user?.id;

		const ownCourse = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId!,
			},
		});

		if (!ownCourse) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const chapter = await db.chapter.findUnique({
			where: {
				id: params.chapterId,
				courseId: params.courseId,
			},
		});

		const muxData = await db.muxData.findUnique({
			where: {
				chapterId: params.chapterId,
			},
		});

		if (!chapter || !chapter.title) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const publishedChapter = await db.chapter.update({
			where: {
				id: params.chapterId,
				courseId: params.courseId,
			},
			data: {
				isPublished: true,
			},
		});

		return NextResponse.json(publishedChapter);
	} catch (error) {
		console.log("[CHAPTER_PUBLISH]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
