const isUserAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send("You must login first!");
	}
};
export default isUserAuthenticated;
