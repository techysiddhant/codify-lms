import { checkSchema } from "express-validator";

export default checkSchema({
	title: {
		errorMessage: "Course title is required!",
		notEmpty: true,
		trim: true,
	},
	// password: {
	// 	errorMessage: "password is required!",
	// 	notEmpty: true,
	// 	trim: true,
	// },
});
