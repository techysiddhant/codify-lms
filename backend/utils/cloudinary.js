import { v2 as cloudinary } from "cloudinary";
import { Config } from "../config/index.js";
import fs from "fs";
cloudinary.config({
	cloud_name: String(Config.CLOUDINARY_NAME),
	api_key: String(Config.CLOUDINARY_KEY),
	api_secret: String(Config.CLOUDINARY_SECRET),
});
const uploadCloudinary = async (localFilePath, folder) => {
	try {
		if (!localFilePath) return null;
		//upload the file on cloudinary
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
			folder: folder,
			upload_preset: folder,
		});
		// const re = await cloudinary.uploader.destroy()
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
export const deleteUpload = async (publicId, folder) => {
	try {
		if (!publicId || !folder) {
			return null;
		}
		const resp = await cloudinary.uploader.destroy(`${folder + "/" + publicId}`);
		return resp;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default uploadCloudinary;
