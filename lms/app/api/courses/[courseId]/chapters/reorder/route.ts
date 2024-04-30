import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; } }
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

    const { list } = await req.json();

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId!
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}