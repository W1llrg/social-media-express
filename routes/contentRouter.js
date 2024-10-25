import express from "express";
import { auth } from "../middleware/midAuth.js";
import {
	contentGetAll,
	contentGetAllByUser,
	contentGetById,
	contentCreate
} from "../services/contentService.js";
import { MyHttpError } from "../utils/errorBuilders.js";

export const contentRouter = express.Router();

contentRouter.use(auth);

contentRouter.get("/", async (req, res, next) => {
	try {
		const contents = await contentGetAll();
		res.status(200).json({ contents });
	} catch (e) {
		next(new MyHttpError(500, "Impossible de récupérer les contenus"));
	}
});

contentRouter.get("/getAllByUser/:id", async (req, res, next) => {
	const userId = req.params.id;

	if (userId) {
		try {
			const contents = await contentGetAllByUser(userId);

			res.status(200).json({ contents });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les contenus de l'utilisateur"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur requis)"));
	}
});

contentRouter.get("/get/:id", async (req, res, next) => {
	if (req.params.id) {
		try {
			const content = await contentGetById(req.params.id);
			res.status(200).json({ content });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer le contenu"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID contenu requis)"));
	}
});

contentRouter.post("/create", async (req, res, next) => {
	if (req.body.title && req.body.userId) {
		try {
			await contentCreate(
				req.body.title,
				req.body.userId
			);
			res.status(201).json({ message: "Contenu créé avec succès" });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de créer le contenu"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (titre et ID utilisateur requis)"));
	}
});