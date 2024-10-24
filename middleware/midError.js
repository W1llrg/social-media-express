import {MyHttpError} from "../utils/errorBuilders.js";

export const midError = async (error, req, res, next) => {
	if (error && error instanceof MyHttpError) {
		res.status(error.status ?? 500).json({mess: error.message ?? "erreur inconnue"});
	} else {
		next();
	}
}