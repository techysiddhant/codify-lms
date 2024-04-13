const isUserAuthenticated = (req, res, next) => {
	// if (req.isAuthenticated()) {
	if (req.user) {
		// console.log(req);
		next();
	} else {
		res.status(401).send("You must login first!");
	}
};
export default isUserAuthenticated;
