import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
import logger from "./config/logger.js";
import googleAuthRoutes from "./routes/GoogleAuth.js";
import githubAuthRoutes from "./routes/GithubAuth.js";
import courseRoutes from "./routes/CourseRoutes.js";
import initializePassport from "./passport.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { Config } from "./config/index.js";

// dotenv.config();
const app = express();
initializePassport();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
	cookieSession({ name: "session", keys: ["test"], maxAge: 24 * 60 * 60 * 100 })
);
// app.use(fileUpload());
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: "/tmp/",
// 	})
// );
// cloudinary.config({
// 	cloud_name: String(Config.CLOUDINARY_NAME),
// 	api_key: String(Config.CLOUDINARY_KEY),
// 	api_secret: String(Config.CLOUDINARY_SECRET),
// });
app.use(function (request, response, next) {
	if (request.session && !request.session.regenerate) {
		request.session.regenerate = (cb) => {
			cb();
		};
	}
	if (request.session && !request.session.save) {
		request.session.save = (cb) => {
			cb();
		};
	}
	next();
});
app.use(passport.initialize());
app.use(passport.session());

export default app;

app.get("/", (req, res) => {
	res.send(`Server is Running`);
});
app.use("/api/v1/auth", googleAuthRoutes);
app.use("/api/v1/auth", githubAuthRoutes);
app.use("/api/v1/course", courseRoutes);
app.use((err, req, res, next) => {
	logger.error(err.message);
	const statusCode = err.statusCode || err.status || 500;
	res.status(statusCode).json({
		errors: [
			{
				type: err.name,
				msg: err.message,
				path: "",
				location: "",
			},
		],
	});
});
