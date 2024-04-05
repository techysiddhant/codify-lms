import { checkSchema } from "express-validator";

export default checkSchema({
	title: {
		errorMessage: "Course title is required!",
		notEmpty: true,
		trim: true,
		isLength: {
			options: { min: 3 },
			errorMessage: "Course title must be at least 3 Characters long!",
		},
	},
	// password: {
	// 	errorMessage: "password is required!",
	// 	notEmpty: true,
	// 	trim: true,
	// },
});
