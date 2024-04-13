import { checkSchema } from "express-validator";

export default checkSchema({
	title: {
		errorMessage: "Chapter title is required!",
		notEmpty: true,
		trim: true,
		isLength: {
			options: { min: 3 },
			errorMessage: "Chapter title must be at least 3 Characters long!",
		},
	},
});
