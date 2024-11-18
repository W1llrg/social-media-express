import express from "express";
import {} from "../services/roomService.js";
import {auth} from "../middleware/midAuth.js";
import {MyHttpError} from "../utils/errorBuilders.js";

export const articleRouter = express.Router();

articleRouter.use(auth);

articleRouter.get("/getAllByContent/:id", async (req, res, next) =>
{
	const contentId = req.params.id;

	if (contentId) {
		try {
			const list = await articleGetAllByContent(contentId);

			res.status(200).json({list});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les articles"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (contentId requis)"));
	}
});

articleRouter.get("/getAllByUser/:id", async (req, res, next) =>
{
	const userId = req.params.id;

	if (userId) {
		try {
			const articles = await articleGetAllByUser(userId);

			res.status(200).json({articles});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les articles"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée"));
	}
});

articleRouter.get("/get/:id", async (req, res, next) =>
{
	const param = req.params.id;

	if (param) {
		try {
			const article = await articleGetById(param);

			res.status(200).json({article});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer cet article"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée"));
	}
});

articleRouter.post("/create", async (req, res, next) =>
{
	if (req.body.userId && req.body.contentId) {
		try {
			const article = await articleCreate(
				req.body.title,
				req.body.content,
				req.body.userId,
				req.body.contentId
			);

			res.status(200).json({message: "article créé"});
		} catch (error) {
			next(new MyHttpError(500, "Impossible de créer l'article"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (titre, contenu, utilisateur requis)"));
	}
});

articleRouter.get("/", async (req, res, next) =>
{
	try {
		const articles = await articleGetAll();

		res.status(200).json({articles});
	} catch (e) {
		next(new MyHttpError(500, "Erreur lors de l'exécution"))
	}
});