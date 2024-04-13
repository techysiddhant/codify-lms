import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import logger from "./config/logger.js";
import googleAuthRoutes from "./routes/GoogleAuth.js";
import githubAuthRoutes from "./routes/GithubAuth.js";
import courseRoutes from "./routes/CourseRoutes.js";
import chapterRoutes from "./routes/ChapterRoutes.js";
import paymentRoutes from "./routes/CheckoutRoutes.js";
import initializePassport from "./passport.js";

const app = express();
initializePassport();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
	cookieSession({ name: "session", keys: ["test"], maxAge: 24 * 60 * 60 * 100 })
);
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
app.use("/api/v1/chapter", chapterRoutes);
app.use("/api/v1/payment", paymentRoutes);
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
