import { getServerSession } from "next-auth/next";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		// const { title } = await req.json();

		if (!session) {
			return NextResponse.json("Unauthorized");
		}
		if (session?.user?.role !== "CREATOR") {
			return NextResponse.json("Unauthorized");
		}
		const values = await req.json();
		const { courseId } = params;
		const userId = session?.user?.id;
		const course = await db.course.update({
			where: {
				id: courseId,
				userId: userId!,
			},
			data: {
				...values,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
