// req.user = {
// 	id: 1,
// 	name: "Dear Crush",
// 	email: "dearcrush.you@gmail.com",
// 	provider: "google",
// 	providerId: "114870028480729406853",
// 	created_at: "2024-04-03T12:42:58.916Z",
// 	updated_at: "2024-04-03T12:42:58.916Z",
// 	role: "USER",
// 	profile:
// 		"https://lh3.googleusercontent.com/a/ACg8ocJ9wjbSuEqoy58rPQjMHkLVyGQVhDts6s3R0Y-2EkiP=s96-c",
// };
import { validationResult } from "express-validator";
import prisma from "../config/db.config.js";
import uploadCloudinary from "../utils/cloudinary.js";

class CourseController {
	static async createCourse(req, res, next) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
			const { title } = req.body;
			const user = req.user;
			const course = await prisma.course.create({
				//FIXME: user id should be dyanamic
				data: {
					userId: user.id,
					title: title,
				},
			});
			return res.status(201).json({ course });
		} catch (error) {
			next(error);
		}
	}
	static async updateCourse(req, res, next) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
			const user = req.user;
			const { description, price, imageUrl, categoryId, title } = req.body;
			const { courseId } = req.params;
			const course = await prisma.course.update({
				where: {
					id: courseId,
					userId: user.id,
				},
				data: {
					description,
					categoryId,
					price,
					imageUrl,
					title,
				},
			});
			return res.status(200).json({ course });
		} catch (error) {
			next(error);
		}
	}
	static async index(req, res, next) {
		try {
			const { title, categoryId } = req.query;
			// const { title, categoryId } = req.body;
			// console.log(title, categoryId);
			const courses = await prisma.course.findMany({
				where: {
					isPublished: true,
					title: {
						contains: title,
					},
					categoryId,
				},
				include: {
					category: true,
				},
			});
			// console.log("Wpp-t,c: ", courses);
			return res.status(200).json(courses);
			// if (title !== "undefined" && categoryId !== "undefined") {
			// 	const courses = await prisma.course.findMany({
			// 		where: {
			// 			isPublished: true,
			// 			title: {
			// 				contains: title,
			// 			},
			// 			categoryId,
			// 		},
			// 		include: {
			// 			category: true,
			// 		},
			// 	});
			// 	console.log("WO-t,c: ", courses);
			// 	return res.status(200).json(courses);
			// } else if (title !== "undefined") {
			// 	const courses = await prisma.course.findMany({
			// 		where: {
			// 			isPublished: true,
			// 			title: {
			// 				contains: title,
			// 			},
			// 		},
			// 		include: {
			// 			category: true,
			// 		},
			// 	});
			// 	console.log("W-t: ", courses);

			// 	return res.status(200).json(courses);
			// } else if (categoryId !== "undefined") {
			// 	const courses = await prisma.course.findMany({
			// 		where: {
			// 			isPublished: true,
			// 			categoryId,
			// 		},
			// 		include: {
			// 			category: true,
			// 		},
			// 	});
			// 	console.log("W-c: ", courses);

			// 	return res.status(200).json(courses);
			// } else {
			// 	const courses = await prisma.course.findMany({
			// 		where: {
			// 			isPublished: true,
			// 		},
			// 		include: {
			// 			category: true,
			// 		},
			// 	});
			// 	console.log("WB all: ", courses);

			// 	return res.status(200).json(courses);
			// }
			// const courses = await prisma.course.findMany({
			// 	include: {
			// 		user: {
			// 			select: {
			// 				name: true,
			// 			},
			// 		},
			// 		category: {
			// 			select: {
			// 				name: true,
			// 			},
			// 		},
			// 	},
			// });
		} catch (error) {
			next(error);
		}
	}
	static async getCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const user = req.user;
			const course = await prisma.course.findUnique({
				where: { id: courseId },
				include: {
					chapters: {
						where: {
							isPublished: true,
						},
						include: {
							userProgress: {
								where: {
									userId: user.id,
								},
							},
						},
						orderBy: {
							position: "asc",
						},
					},
				},
			});
			return res.status(200).json(course);
		} catch (error) {
			next(error);
		}
	}
	static async courseImage(req, res, next) {
		try {
			const { courseId } = req.body;
			const image = req.file;
			const user = req.user;
			const folder = "thumbnail";
			const result = await uploadCloudinary(image.path, folder);
			if (result == null) {
				return res
					.status(404)
					.json({ errors: [{ error: "Upload failed Try again!" }] });
			}
			// console.log(result);

			const course = await prisma.course.update({
				where: {
					id: courseId,
					userId: user.id,
				},
				data: {
					imageUrl: result.secure_url,
					imagePublicId: result.asset_id,
				},
			});
			return res.status(201).json(course);
		} catch (error) {
			next(error);
		}
	}
	static async getCategoryList(req, res, next) {
		try {
			const categories = await prisma.category.findMany({});
			return res.status(200).json(categories);
		} catch (error) {
			next(error);
		}
	}
	static async getCoursesForCreatorByUserId(req, res, next) {
		try {
			const user = req.user;
			const courses = await prisma.course.findMany({
				where: {
					userId: user.id,
				},
				orderBy: {
					createdAt: "desc",
				},
			});
			return res.status(200).json(courses);
		} catch (error) {
			next(error);
		}
	}
	static async getCourseForCreator(req, res, next) {
		try {
			const { courseId } = req.params;
			const user = req.user;
			const course = await prisma.course.findUnique({
				where: { id: courseId, userId: user.id },
				include: {
					// user: {
					// 	select: {
					// 		name: true,
					// 	},
					// },
					chapters: {
						orderBy: {
							position: "asc",
						},
					},
					category: {
						select: {
							name: true,
						},
					},
				},
			});
			return res.status(200).json(course);
		} catch (error) {
			next(error);
		}
	}
	static async publishCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const user = req.user;
			const course = await prisma.course.findUnique({
				where: { id: courseId, userId: user.id },
				include: {
					chapters: {
						include: {
							muxData: true,
						},
					},
				},
			});
			const hasPublishedChapter = course.chapters.some(
				(chapter) => chapter.isPublished
			);
			if (
				!course.title ||
				!course.description ||
				!course.imageUrl ||
				!course.categoryId ||
				!hasPublishedChapter
			) {
				return res
					.status(401)
					.json({ errors: [{ error: "Fill the all Details of the chapters" }] });
			}
			const publishedCourse = await prisma.course.update({
				where: { id: courseId, userId: user.id },
				data: {
					isPublished: true,
				},
			});
			return res.status(200).json(publishedCourse);
		} catch (error) {
			next(error);
		}
	}
	static async getDashboardCourse(req, res, next) {
		try {
			const user = req.user;
			const purchasedCourses = await prisma.purchase.findMany({
				where: { userId: user.id },
				select: {
					course: {
						include: {
							category: true,
							chapters: {
								where: {
									isPublished: true,
								},
							},
						},
					},
				},
			});
			return res.status(200).json(purchasedCourses);
		} catch (error) {
			next(error);
		}
	}
}

export default CourseController;
