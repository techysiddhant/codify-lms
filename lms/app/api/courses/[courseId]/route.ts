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
		const { price, title, description, shortDescription, imageUrl, categoryId } =
			await req.json();
		const { courseId } = params;
		const userId = session?.user?.id;
		const isCoursePublished = await db.course.findUnique({
			where: { id: courseId },
		});
		if (isCoursePublished?.isPublished) {
			const course = await db.course.update({
				where: {
					id: courseId,
					userId: userId!,
				},
				data: {
					title,
					description,
					shortDescription,
					imageUrl,
					categoryId,
				},
			});
			return NextResponse.json(course);
		}
		const course = await db.course.update({
			where: {
				id: courseId,
				userId: userId!,
			},
			data: {
				price,
				title,
				description,
				shortDescription,
				imageUrl,
				categoryId,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
