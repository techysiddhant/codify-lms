import { v2 as cloudinary } from "cloudinary";
import { Config } from "../config/index.js";
import fs from "fs";
cloudinary.config({
	cloud_name: String(Config.CLOUDINARY_NAME),
	api_key: String(Config.CLOUDINARY_KEY),
	api_secret: String(Config.CLOUDINARY_SECRET),
});
// const uploadCloudinary = async (file) => {
// 	try {
// 		const uploadImg = await cloudinary.uploader.upload(
// 			file.tempFilePath,
// 			{
// 				upload_preset: "thumbnail",
// 			},
// 			(err, result) => {
// 				if (err) {
// 					console.log(err);
// 					return null;
// 				}
// 				return result;
// 			}
// 		);
// 		// console.log("UPLOAD: ", uploadImg);
// 		// if (uploadImg) {
// 		// 	return uploadImg;
// 		// } else {
// 		// 	return null;
// 		// }
// 	} catch (error) {
// 		console.log(error);
// 		return null;
// 	}
// };
const uploadCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null;
		//upload the file on cloudinary
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
			upload_preset: "thumbnail",
		});
		console.log(response);
		// file has been uploaded successfull
		//console.log("file is uploaded on cloudinary ", response.url);
		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		console.log(error);
		fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
		return null;
	}
};
export default uploadCloudinary;
