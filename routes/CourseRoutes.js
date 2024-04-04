import { Router } from "express";
import CourseController from "../Controllers/CourseController.js";
import isUserAuthenticated from "../middlewares/auth.js";
const router = Router();
router.get("/create", CourseController.createCourse);
export default router;
