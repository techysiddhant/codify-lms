import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
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
        userId:userId!
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      }
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}