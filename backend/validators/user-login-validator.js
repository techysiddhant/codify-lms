import { checkSchema } from "express-validator";

// export default [body('email').notEmpty().withMessage('Email is required!')];

export default checkSchema({
	email: {
		errorMessage: "Email is required!",
		notEmpty: true,
		trim: true,
		isEmail: {
			errorMessage: "Invalid email address!",
		},
	},
	password: {
		errorMessage: "password is required!",
		notEmpty: true,
		trim: true,
		isLength: {
			options: { min: 8 },
			errorMessage: "Password must be at least 8 characters long!",
		},
	},
});
