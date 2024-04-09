import { Router } from "express";
import ChapterController from "../Controllers/ChapterController.js";
import chapterValidator from "../validators/chapter-validator.js";
const router = Router();
router.post(
	"/create/:courseId",
	chapterValidator,
	ChapterController.createChapter
);
router.patch("/update/:chapterId", ChapterController.updateChapter);
router.patch("/reorder/:courseId", ChapterController.updateChapter);
router.put("/publish/:chapterId", ChapterController.publishChapter);
router.put("/unpublish/:chapterId", ChapterController.unPublishChapter);
router.delete("/delete/:chapterId", ChapterController.deleteChapter);
export default router;
