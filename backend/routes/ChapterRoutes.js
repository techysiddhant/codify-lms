import { Router } from "express";
import ChapterController from "../Controllers/ChapterController.js";
import chapterValidator from "../validators/chapter-validator.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
router.post(
	"/create/:courseId",
	chapterValidator,
	ChapterController.createChapter
);
router.patch(
	"/update/:chapterId",
	// upload.single("video"),
	ChapterController.updateChapter
);
router.patch("/reorder/:courseId", ChapterController.updateChapter);
router.put("/publish/:chapterId", ChapterController.publishChapter);
router.put("/unpublish/:chapterId", ChapterController.unPublishChapter);
router.delete("/delete/:chapterId", ChapterController.deleteChapter);
router.post(
	"/attachment/:chapterId",
	upload.single("file"),
	ChapterController.addAttachment
);
router.delete("/attachment/:attachmentId", ChapterController.deleteAttachment);
router.post("/progress/:chapterId", ChapterController.updateUserProgress);
export default router;
