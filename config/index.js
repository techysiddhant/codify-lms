import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
config({
	path: path.join(__dirname, `./.env.${process.env.NODE_ENV || "dev"}`),
});
const {
	PORT,
	NODE_ENV,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	CLOUDINARY_NAME,
	CLOUDINARY_KEY,
	CLOUDINARY_SECRET,
	IMAGEKIT_PUBLIC_KEY,
	IMAGEKIT_PRIVATE_KEY,
	IMAGEKIT_URL_ENDPOINT,
} = process.env;

export const Config = {
	PORT,
	NODE_ENV,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	CLOUDINARY_NAME,
	CLOUDINARY_KEY,
	CLOUDINARY_SECRET,
	IMAGEKIT_PUBLIC_KEY,
	IMAGEKIT_PRIVATE_KEY,
	IMAGEKIT_URL_ENDPOINT,
};
