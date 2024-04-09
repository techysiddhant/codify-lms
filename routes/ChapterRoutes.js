import { Router } from "express";
import ChapterController from "../Controllers/ChapterController.js";
import chapterValidator from "../validators/chapter-validator.js";
const router = Router();
router.post(
	"/create/:courseId",
	chapterValidator,
	ChapterController.createChapter
);
export default router;
