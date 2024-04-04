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
class CourseController {
	static async createCourse(req, res, next) {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.array() });
		}
		try {
			const { title } = req.body;
			const user = req.user;
			// const course =
			return res.json({ user });
		} catch (error) {
			next(error);
		}
	}
}

export default CourseController;
