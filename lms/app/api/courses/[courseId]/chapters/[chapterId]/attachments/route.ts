import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string,chapterId:string } }
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
        const { url } = await req.json();
  
  
      const courseOwner = await db.course.findUnique({
        where: {
          id: params.courseId,
          userId: userId!,
        }
      });
  
      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const attachment = await db.attachment.create({
        data: {
          url:url!,
          name: url.split("/").pop(),
          courseId: params.courseId,
          chapterId:params.chapterId,
          publicId:'0'
        }
      });
  
      return NextResponse.json(attachment);
    } catch (error) {
      console.log("COURSE_ID_ATTACHMENTS", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }