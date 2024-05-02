"use server";

import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";
import { getServerSession } from "next-auth/next";
type PurchaseWithCourse = Purchase & {
  course: Course;
};
export default async function fetchCreatorCourses() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (session?.user?.role !== "CREATOR") {
    return null;
  }
  try {
    const courses = await db.course.findMany({
      where: {
        userId: session?.user?.id!,
      },
    });
    return courses;
  } catch (error) {}
}
export async function fetchCreatorCourse(courseId: string) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (session?.user?.role !== "CREATOR") {
    return null;
  }
  try {
    const courses = await db.course.findUnique({
      where: {
        userId: session?.user?.id!,
        id: courseId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    return courses;
  } catch (error) {}
}
export async function fetchCreatorCourseChapterById(chapterId: string) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (session?.user?.role !== "CREATOR") {
    return null;
  }
  try {
    const courses = await db.chapter.findUnique({
      where: {
        userId: session?.user?.id!,
        id: chapterId,
      },
      include: {
        muxData: true,
        attachments: true,
      },
    });
    return courses;
  } catch (error) {}
}
const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};
export async function getAnalytics(userId: string) {
  //   const session: CustomSession | null = await getServerSession(authOptions);
  //   if (!session) {
  //     return null;
  //   }
  //   if (session?.user?.role !== "CREATOR") {
  //     return null;
  //   }
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });
    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
}
export async function getDraftCourseByCourseId({
  courseId,
}: {
  courseId: string;
}) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        // chapters: {
        //   orderBy: {
        //     position: "asc",
        //   },
        // },
        category:true
      },
    });

    return course;
  } catch (error) {
    console.log("FETCH-Course description by course id", error);
    return null
    throw new Error("Failed to fetch courses");
  }
}