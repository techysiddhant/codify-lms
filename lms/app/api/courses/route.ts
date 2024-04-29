import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { CustomSession, authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		const { title } = await req.json();
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (session?.user?.role !== "CREATOR") {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.create({
			data: {
				userId: session?.user?.id!,
				title,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
