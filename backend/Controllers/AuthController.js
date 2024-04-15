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
			const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey, {
				expiresIn: "1d",
			});
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
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ error: "Invalid email or password" }] });
			}
			const comparePassword = bcrypt.compare(password, user.password);
			if (comparePassword) {
				const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey, {
					expiresIn: "1d",
				});
				return res.json({ token, user });
			}
			return res
				.status(400)
				.json({ errors: [{ error: "Invalid email or password" }] });
		} catch (error) {
			next(error);
		}
	}
	static async logout(req, res, next) {
		try {
			req.logout((err) => {
				if (err) {
					return res.status(500).json({ message: "Failed to log out" });
				}
				res.json({ message: "Logged out successfully" });
			});
		} catch (error) {
			console.log(error);
		}
	}
}

export default AuthController;
