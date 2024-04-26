import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
// import { isTeacher } from "@/lib/teacher";
export async function POST(req: Request) {
  try {
    //   const { userId } = auth();
    const session = getServerSession();
    const { title } = await req.json();
    console.log(session);
    // if (!userId || !isTeacher(userId)) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // const course = await db.course.create({
    //   data: {
    //     // userId,
    //     title,
    //   },
    // });

    return NextResponse.json(session);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
