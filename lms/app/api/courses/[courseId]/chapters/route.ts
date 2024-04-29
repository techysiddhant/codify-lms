import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function POST(
	req: Request,
	{ params }: { params: { courseId: string } }
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
		const { title } = await req.json();

		const courseOwner = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId!,
			},
		});

		if (!courseOwner) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const lastChapter = await db.chapter.findFirst({
			where: {
				courseId: params.courseId,
			},
			orderBy: {
				position: "desc",
			},
		});

		const newPosition = lastChapter ? lastChapter.position + 1 : 1;

		const chapter = await db.chapter.create({
			data: {
				title: title,
				courseId: params.courseId!,
				position: newPosition,
				userId: userId!,
			},
		});

		return NextResponse.json(chapter);
	} catch (error) {
		console.log("[CHAPTERS]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
