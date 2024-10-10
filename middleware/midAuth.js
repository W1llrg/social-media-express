import jwt from "jsonwebtoken";

const JWT_SECRET = "abCDeFgHIjkLMnOpQrstuVwXYZ";

export const auth = (req, res, next) => {
	const token = req.headers?.authorization?.split(' ')[1] ?? '';
	if (token) {
		const user = jwt.decode(token, JWT_SECRET);
		req.user = {...user};
		next();
	} else {
		res.status(401).send({error: 401});
	}
}