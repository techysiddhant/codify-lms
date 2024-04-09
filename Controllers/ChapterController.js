import { validationResult } from "express-validator";
import prisma from "../config/db.config.js";

class ChapterController {
	static async createChapter(req, res, next) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
			const { courseId } = req.params;
			const { title } = req.body;
			const user = req.user;
			// // FIXME: make user dynamic
			const lastChapter = await prisma.chapter.findFirst({
				where: {
					courseId: courseId,
				},
				orderBy: {
					position: "desc",
				},
			});
			const newPosition = lastChapter ? lastChapter.position + 1 : 1;
			const chapter = await prisma.chapter.create({
				data: {
					title: title,
					courseId: courseId,
					position: newPosition,
					userId: 1,
				},
			});
			return res.status(201).json(chapter);
		} catch (error) {
			next(error);
		}
	}
	static async updateChapter(req, res, next) {
		try {
			const { chapterId } = req.params;
			const user = req.user;

			const { description, videoUrl, position, isFree } = req.body;
			const chapter = await prisma.chapter.update({
				where: {
					id: chapterId,
					//FIXME: add dynamic value
					userId: 1,
				},
				data: {
					description,
					videoUrl,
					position,
					isFree,
				},
			});
			return res.status(200).json({ chapter });
		} catch (error) {
			next(error);
		}
	}
	static async reorderChapter(req, res, next) {
		try {
			const { courseId } = req.params;
			const { list } = req.body;
			const user = req.user;
			// FIXME: fix the user
			const ownCourse = await prisma.course.findUnique({
				where: {
					id: courseId,
					userId: 1,
				},
			});
			if (!ownCourse) {
				return res.status(400).json({ errors: [{ error: "Course not found!" }] });
			}
			for (let item of list) {
				await prisma.chapter.update({
					where: { id: item.id },
					data: { position: item.position },
				});
			}

			return res.status(200).json({ message: "Success" });
		} catch (error) {
			next(error);
		}
	}
	static async deleteChapter(req, res, next) {
		// TODO: also delete the video and attachments
		try {
			const { chapterId } = req.params;
			const user = req.user;
			await prisma.chapter.delete({
				where: {
					id: chapterId,
					//FIXME: add the dynamic value
					userId: 1,
				},
			});
			return res.status(200).json({ message: "success" });
		} catch (error) {
			next(error);
		}
	}
	static async publishChapter(req, res, next) {
		try {
			const { chapterId } = req.params;
			const user = req.user;
			const chapter = await prisma.chapter.findUnique({
				// FIXME: add dynamic user
				where: { id: chapterId, userId: 1 },
			});
			//TODO: Find the mux data as well
			// const muxData = await prisma.muxData.findUnique({
			// 	where: {
			// 		chapterId: params.chapterId,
			// 	},
			// });
			if (
				!chapter ||
				!muxData ||
				!chapter.title ||
				!chapter.description ||
				!chapter.videoUrl
			) {
				return res
					.status(401)
					.json({ errors: [{ error: "Fill the all Details of the chapters" }] });
			}
			const publishedChapter = await prisma.chapter.update({
				where: { id: chapterId, userId: 1 },
				data: {
					isPublished: true,
				},
			});
			return res.status(200).json(publishedChapter);
		} catch (error) {
			next(error);
		}
	}
	static async unPublishChapter(req, res, next) {
		try {
			const { chapterId } = req.params;
			const user = req.user;
			const unPublishChapter = await prisma.chapter.update({
				// FIXME: add the dynamic user
				where: { id: chapterId, userId: 1 },
				data: {
					isPublished: false,
				},
			});
			return res.status(200).json(unPublishChapter);
		} catch (error) {
			next(error);
		}
	}
}

export default ChapterController;
