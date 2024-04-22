import { Router } from "express";
import CourseController from "../Controllers/CourseController.js";
import isUserAuthenticated from "../middlewares/auth.js";
import courseValidator from "../validators/course-validator.js";
import { upload } from "../middlewares/multer.js";
import passport from "passport";
import { canAccess } from "../middlewares/canAccess.js";
import { Roles } from "../constants/index.js";

const router = Router();
router.get("/categories", CourseController.getCategoryList);

router.get("/all", CourseController.index);
router.get(
	"/user-courses",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.USER]),
	CourseController.getDashboardCourse
);
router.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	courseValidator,
	CourseController.createCourse
);
router.get(
	"/:courseId",
	passport.authenticate("jwt", { session: false }),
	CourseController.getCourse
);
router.patch(
	"/update/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	CourseController.updateCourse
);
router.post(
	"/image",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	upload.single("image"),
	CourseController.courseImage
);

// FOR Creator Routes
router.get(
	"/creator/courses",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	CourseController.getCoursesForCreatorByUserId
);
router.get(
	"/creator/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	CourseController.getCourseForCreator
);
router.put(
	"/publish/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	CourseController.publishCourse
);
// router.put(
// 	"/unpublish/:chapterId",
// 	passport.authenticate("jwt", { session: false }),
// 	canAccess([Roles.CREATOR]),
// 	ChapterController.unPublishChapter
// );
router.delete(
	"/publish/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	CourseController.publishCourse
);
export default router;
