import { v2 as cloudinary } from "cloudinary";
import { Config } from "../config/index.js";
// cloudinary.config({
// 	cloud_name: Config.CLOUDINARY_NAME,
// 	api_key: Config.CLOUDINARY_KEY,
// 	api_secret: Config.CLOUDINARY_SECRET,
// });
const uploadCloudinary = async (file) => {
	try {
		const uploadImg = await cloudinary.uploader.upload(
			file.tempFilePath,
			{
				upload_preset: "thumbnail",
			},
			(err, result) => {
				if (err) {
					console.log(err);
					return null;
				}
				return result;
			}
		);
		// console.log("UPLOAD: ", uploadImg);
		// if (uploadImg) {
		// 	return uploadImg;
		// } else {
		// 	return null;
		// }
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default uploadCloudinary;
