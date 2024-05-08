import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{
		params,
	}: { params: { courseId: string; chapterId: string; attachmentId: string } }
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

		const courseOwner = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId!,
			},
		});

		if (!courseOwner) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const attachment = await db.attachment.delete({
			where: {
				courseId: params.courseId,
				id: params.attachmentId,
				chapterId: params.chapterId,
			},
		});

		return NextResponse.json(attachment);
	} catch (error) {
		console.log("ATTACHMENT_ID", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
