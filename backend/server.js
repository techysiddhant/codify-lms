import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";
const port = Config.PORT || 3000;

app.listen(process.env.PORT, () => {
	// console.log(`Server is Working on PORT:${port}`);
	logger.info(`Server is Working on PORT:${port}`);
});
