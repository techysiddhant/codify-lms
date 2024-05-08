// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function PUT(
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
		const { isCompleted } = await req.json();

		const userProgress = await db.userProgress.upsert({
			where: {
				userId_chapterId: {
					userId: userId!,
					chapterId: params.chapterId,
				},
			},
			update: {
				isCompleted,
			},
			create: {
				userId: userId!,
				chapterId: params.chapterId,
				isCompleted,
			},
		});

		return NextResponse.json(userProgress);
	} catch (error) {
		console.log("[CHAPTER_ID_PROGRESS]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
