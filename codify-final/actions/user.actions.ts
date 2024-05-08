"use server";

import { db } from "@/lib/db";
import { prismaExclude } from "@/lib/excludeField";
import {
	Attachment,
	Category,
	Chapter,
	Course,
	MuxData,
	UserProgress,
} from "@prisma/client";
type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: { id: string }[];
	progress: number | null;
	creator: { displayName: string; image: string | null } | null;
};

type GetCoursesWithUser = {
	userId: string;
	title?: string;
	categoryId?: string;
};
type GetCourses = {
	userId?: string;
	title?: string;
	categoryId?: string;
};
interface GetChapterProps {
	userId: string;
	courseId: string;
	chapterId: string;
}
type CourseWithProgressWithCategoryDashboard = Course & {
	category: Category;
	chapters: Chapter[];
	progress: number | null;
	creator: { displayName: string; image: string | null } | null;
};
// interface NextChapter extends Chapter {
// 	videoUrl?: string | null;
// }
type NextChapter = {
	id: string;
	title: string;
	description: string | null;
	videoUrl?: string | null;
	videoId?: string | null;
	position: number;
	isPublished: boolean;
	isFree: boolean;
	courseId: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	muxData?: MuxData;
	attachments?: Attachment[];
	userProgress?: UserProgress[];
};
export async function fetchCategories() {
	try {
		const categories = await db.category.findMany({});
		return categories;
	} catch (error) {
		console.log("FETCH-CATEGORIES", error);
		throw new Error("Failed to fetch user");
	}
}
export async function getProgress(userId: string, courseId: string) {
	try {
		const publishedChapters = await db.chapter.findMany({
			where: {
				courseId: courseId,
				isPublished: true,
			},
			select: {
				id: true,
			},
		});
		const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

		const validCompletedChapters = await db.userProgress.count({
			where: {
				userId: userId,
				chapterId: {
					in: publishedChapterIds,
				},
				isCompleted: true,
			},
		});

		const progressPercentage =
			(validCompletedChapters / publishedChapterIds.length) * 100;

		return progressPercentage;
	} catch (error) {
		console.log("Get-Progress", error);
		throw new Error("Failed to fetch user");
	}
}
export async function fetchCoursesWithUserId({
	userId,
	title,
	categoryId,
}: GetCoursesWithUser) {
	try {
		const courses = await db.course.findMany({
			where: {
				isPublished: true,
				title: {
					search: title?.split(" ").join(" & "),
				},
				categoryId,
			},
			include: {
				category: true,
				chapters: {
					where: {
						isPublished: true,
					},
					select: {
						id: true,
					},
				},
				purchases: {
					where: {
						userId,
					},
				},
				creator: {
					select: {
						displayName: true,
						image: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		const coursesWithProgress: CourseWithProgressWithCategory[] =
			await Promise.all(
				courses.map(async (course) => {
					if (course.purchases.length === 0) {
						return {
							...course,
							progress: null,
						};
					}

					const progressPercentage = await getProgress(userId, course.id);

					return {
						...course,
						progress: progressPercentage,
					};
				})
			);

		return coursesWithProgress;
	} catch (error) {
		console.log("FETCH-Courses", error);
		throw new Error("Failed to fetch courses");
	}
}
export async function fetchCourses({ title, categoryId }: GetCourses) {
	try {
		const courses = await db.course.findMany({
			where: {
				isPublished: true,
				title: {
					// contains: title,
					search: title?.split(" ").join(" & "),
				},
				categoryId,
			},
			include: {
				category: true,
				chapters: {
					where: {
						isPublished: true,
					},
					select: {
						id: true,
					},
				},
				creator: {
					select: {
						displayName: true,
						image: true,
					},
				},
				// purchases: {
				// 	where: {
				// 		userId,
				// 	},
				// },
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return courses;
	} catch (error) {
		console.log("FETCH-Courses", error);
		throw new Error("Failed to fetch courses");
	}
}
export async function getCourseByCourseId({
	courseId,
	userId,
}: {
	courseId: string;
	userId: string;
}) {
	try {
		const course = await db.course.findUnique({
			where: {
				id: courseId,
			},
			include: {
				chapters: {
					where: {
						isPublished: true,
					},
					include: {
						userProgress: {
							where: {
								userId,
							},
						},
					},
					orderBy: {
						position: "asc",
					},
				},
			},
		});

		return course;
	} catch (error) {
		console.log("FETCH-Courses", error);
		throw new Error("Failed to fetch courses");
	}
}
export async function getChapterById({
	userId,
	courseId,
	chapterId,
}: GetChapterProps) {
	try {
		const purchase = await db.purchase.findUnique({
			where: {
				userId_courseId: {
					userId: userId,
					courseId: courseId,
				},
			},
		});

		const course = await db.course.findUnique({
			where: {
				isPublished: true,
				id: courseId,
			},
			select: {
				price: true,
			},
		});

		const chapter = await db.chapter.findUnique({
			where: {
				id: chapterId,
				isPublished: true,
			},
			select: prismaExclude("Chapter", ["videoUrl"]),
		});

		if (!chapter || !course) {
			throw new Error("Chapter or course not found");
		}

		let muxData = null;
		let attachments: Attachment[] = [];
		let nextChapter: NextChapter | null = null;

		if (purchase) {
			attachments = await db.attachment.findMany({
				where: {
					chapterId: chapterId,
				},
			});
		}

		if (chapter.isFree || purchase) {
			muxData = await db.muxData.findUnique({
				where: {
					chapterId: chapterId,
				},
			});

			nextChapter = await db.chapter.findFirst({
				where: {
					courseId: courseId,
					isPublished: true,
					position: {
						gt: chapter?.position,
					},
				},
				select: prismaExclude("Chapter", ["videoUrl"]),
				orderBy: {
					position: "asc",
				},
			});
		}

		const userProgress = await db.userProgress.findUnique({
			where: {
				userId_chapterId: {
					userId,
					chapterId,
				},
			},
		});

		return {
			chapter,
			course,
			muxData,
			attachments,
			nextChapter,
			userProgress,
			purchase,
		};
	} catch (error) {
		console.log("[GET_CHAPTER]", error);
		return {
			chapter: null,
			course: null,
			muxData: null,
			attachments: [],
			nextChapter: null,
			userProgress: null,
			purchase: null,
		};
	}
}
export async function getDashboardCourses(userId: string) {
	try {
		const purchasedCourses = await db.purchase.findMany({
			where: {
				userId: userId,
			},
			select: {
				course: {
					include: {
						category: true,
						chapters: {
							where: {
								isPublished: true,
							},
						},
						creator: {
							select: {
								displayName: true,
								image: true,
							},
						},
					},
				},
			},
		});

		const courses = purchasedCourses.map(
			(purchase) => purchase.course
		) as CourseWithProgressWithCategoryDashboard[];

		for (let course of courses) {
			const progress = await getProgress(userId, course.id);
			course["progress"] = progress;
		}
		const completedCourses = courses.filter((course) => course.progress === 100);
		const coursesInProgress = courses.filter(
			(course) => (course.progress ?? 0) < 100
		);

		return {
			completedCourses,
			coursesInProgress,
		};
	} catch (error) {
		console.log("[GET DASHBOARD COURSES]", error);
		return {
			completedCourses: [],
			coursesInProgress: [],
		};
	}
}
export async function getCourseDetailsByCourseId({
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
				chapters: {
					where: {
						isPublished: true,
					},

					// include: {
					//   userProgress: {
					//     where: {
					//       userId,
					//     },
					//   },
					// },
					orderBy: {
						position: "asc",
					},
				},
				creator: {
					select: {
						displayName: true,
						image: true,
						description: true,
					},
				},
				category: true,
			},
		});

		return course;
	} catch (error) {
		console.log("FETCH-Course description by course id", error);
		return null;
		throw new Error("Failed to fetch courses");
	}
}
