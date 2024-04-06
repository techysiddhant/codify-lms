import ImageKit from "imagekit";
import { Config } from "../config/index.js";
const imagekit = new ImageKit({
	publicKey: String(Config.IMAGEKIT_PUBLIC_KEY),
	privateKey: String(Config.IMAGEKIT_PRIVATE_KEY),
	urlEndpoint: String(Config.IMAGEKIT_URL_ENDPOINT),
});

const uploadImage = async (name, content) => {
	try {
		const result = await imagekit.upload({
			file: content,
			fileName: name,
		});
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};
export default uploadImage;
