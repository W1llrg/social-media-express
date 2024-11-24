import express from "express";
import { auth } from "../middleware/midAuth.js";
import {
	chatGetAll,
	chatGetByUser,
	chatGetByRoom,
	chatGetById,
	chatCreate
} from "../services/chatService.js";
import { MyHttpError } from "../utils/errorBuilders.js";

export const chatRouter = express.Router();

chatRouter.use(auth);

chatRouter.get("/", async (req, res, next) => {
	try {
		const chats = await chatGetAll();
		res.status(200).json({ chats });
	} catch (e) {
		next(new MyHttpError(500, "Impossible de récupérer les chats"));
	}
});

chatRouter.get("/getByUser", async (req, res, next) => {
	if (req.body.userId) {
		try {
			const chats = await chatGetByUser(req.body.userId);
			res.status(200).json({ chats });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les chats de l'utilisateur"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur requis)"));
	}
});

chatRouter.get("/getByRoom/:roomId", async (req, res, next) => {
	if (req.params.roomId) {
		try {
			const chats = await chatGetByRoom(req.params.roomId);
			res.status(200).json({ chats });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les chats de la room"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID room requis)"));
	}
});

chatRouter.get("/get/:id", async (req, res, next) => {
	if (req.params.id) {
		try {
			const chat = await chatGetById(req.params.id);
			res.status(200).json({ chat });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer le chat"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID chat requis)"));
	}
});

chatRouter.post("/create", async (req, res, next) => {
	if (req.body.userId && req.body.roomId && req.body.content) {
		try {
			await chatCreate(
				req.body.userId,
				req.body.roomId,
				req.body.content
			);
			res.status(201).json({ message: "Message créé avec succès" });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de créer le message"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur, ID room et contenu requis)"));
	}
});