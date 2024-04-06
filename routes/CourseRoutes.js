import { Router } from "express";
import CourseController from "../Controllers/CourseController.js";
import isUserAuthenticated from "../middlewares/auth.js";
import courseValidator from "../validators/course-validator.js";
// import multer from "multer";
import { upload } from "../middlewares/multer.js";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const router = Router();
router.get("/all", CourseController.index);
router.post("/create", courseValidator, CourseController.createCourse);
router.get("/:courseId", courseValidator, CourseController.getCourse);
router.patch(
	"/update/:courseId",
	courseValidator,
	CourseController.updateCourse
);
router.post("/image", upload.single("image"), CourseController.courseImage);
export default router;
