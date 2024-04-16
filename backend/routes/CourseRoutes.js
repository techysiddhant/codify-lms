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
router.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	courseValidator,
	CourseController.createCourse
);
router.get("/:courseId", CourseController.getCourse);
router.patch(
	"/update/:courseId",
	courseValidator,
	CourseController.updateCourse
);
router.post("/image", upload.single("image"), CourseController.courseImage);
export default router;
