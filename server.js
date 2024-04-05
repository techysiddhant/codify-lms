import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";
const port = process.env.PORT || 3000;
import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
// 	cloud_name: Config.CLOUDINARY_NAME,
// 	api_key: Config.CLOUDINARY_KEY,
// 	api_secret: Config.CLOUDINARY_SECRET,
// });
// console.log(Config.CLOUDINARY_KEY);
app.listen(process.env.PORT, () => {
	// console.log(`Server is Working on PORT:${port}`);
	logger.info(`Server is Working on PORT:${port}`);
});
