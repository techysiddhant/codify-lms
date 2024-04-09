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
			// const user = req.user;
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
				},
			});
			return res.status(201).json({ chapter });
		} catch (error) {
			next(error);
		}
	}
}

export default ChapterController;
