import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import { jwtOptions } from "../config/jwtPassport.js";
import { validationResult } from "express-validator";
class AuthController {
	static async register(req, res, next) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
			const { email, password, name } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					name,
				},
			});
			const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
			return res.status(201).json({ token, user });
		} catch (error) {
			next(error);
		}
	}
	static async login(req, res, next) {
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({ errors: result.array() });
			}
			const { email, password } = req.body;
			const user = await prisma.user.findUnique({ where: { email: email } });
			const comparePassword = await bcrypt.compare(password, user.password);
			if (comparePassword) {
				const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey, {
					expiresIn: "1m",
				});
				return res.json({ token, user });
			}
			return res
				.status(400)
				.json({ errors: [{ error: "check email or password" }] });
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
