import express from "express";
import {auth} from "../middleware/midAuth.js";
import {
	commentGetAll,
	commentGetAllByUser,
	commentGetById,
	commentCreate
} from "../services/commentService.js";
import {MyHttpError} from "../utils/errorBuilders.js";

export const commentRouter = express.Router();

commentRouter.use(auth);

commentRouter.get("/", async (req, res, next) =>
{
	try {
		const comments = await commentGetAll();
		res.status(200).json({comments});
	} catch (e) {
		next(new MyHttpError(500, "Impossible de récupérer les commentaires"));
	}
});

commentRouter.get("/getAllByUser/:id", async (req, res, next) =>
{
	if (req.params.id) {
		try {
			const comments = await commentGetAllByUser(req.params.id);
			res.status(200).json({comments});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les commentaires de l'utilisateur"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur requis)"));
	}
});

commentRouter.get("/get/:id", async (req, res, next) =>
{
	if (req.params.id) {
		try {
			const comment = await commentGetById(req.params.id);
			res.status(200).json({comment});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer le commentaire"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID commentaire requis)"));
	}
});

commentRouter.post("/create", async (req, res, next) =>
{
	if (req.body.content && req.body.userId && req.body.articleId) {
		try {
			await commentCreate(
				req.body.content,
				req.body.userId,
				req.body.articleId
			);
			res.status(201).json({message: "Commentaire créé avec succès"});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de créer le commentaire"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (contenu, ID utilisateur et ID article requis)"));
	}
});