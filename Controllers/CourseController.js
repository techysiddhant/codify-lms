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
import { v2 as cloudinary } from "cloudinary";
import uploadCloudinary from "../utils/cloudinary.js";
import uploadImage from "../utils/imageUpload.js";
import getDataUri from "../utils/dataUri.js";

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
				data: {
					userId: 1,
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
			const { description, isPublished, price, imageUrl, categoryId, title } =
				req.body;
			const { courseId } = req.params;
			const course = await prisma.course.update({
				where: {
					id: courseId,
				},
				data: {
					description,
					isPublished,
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
			const courses = await prisma.course.findMany({
				include: {
					user: {
						select: {
							name: true,
						},
					},
					category: {
						select: {
							name: true,
						},
					},
				},
			});
			return res.status(200).json(courses);
		} catch (error) {
			next(error);
		}
	}
	static async getCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const course = await prisma.course.findUnique({
				where: { id: courseId },
				include: {
					user: {
						select: {
							name: true,
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
	static async courseImage(req, res, next) {
		try {
			const { courseId } = req.body;
			const image = req.file;
			const avatarLocalPath = req.files?.image[0]?.path;
			// const result = uploadCloudinary(image);
			console.log(image);
			console.log(image.path);
			const result = await uploadCloudinary(image.path);
			// const fileUri = getDataUri(file);
			// console.log(fileUri);
			// const result = await uploadImage(file.originalname, fileUri.content);
			// if (result == null) {
			// 	return res.json({ errors: [{ error: "Upload failed Try again!" }] });
			// }
			// // console.log(image);
			return res.json(result);
		} catch (error) {
			next(error);
		}
	}
}

export default CourseController;
