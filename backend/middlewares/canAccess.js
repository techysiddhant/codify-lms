export const canAccess = (roles) => {
	return (req, res, next) => {
		const _req = req;
		const roleFromToken = _req.auth.role;
		if (!roles.includes(roleFromToken)) {
			const error = "";
			next(error);
			return;
		}
		next();
	};
};
