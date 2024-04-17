import createHttpError from "http-errors";
export const canAccess = (roles) => {
	return (req, res, next) => {
		const _req = req;
		const roleFromToken = _req.user.role;
		console.log(roles);
		console.log(roles.includes(roleFromToken));
		if (!roles.includes(roleFromToken)) {
			const error = createHttpError(403, "Access Denied");
			next(error);
			return;
		}
		next();
	};
};
