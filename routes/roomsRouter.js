import express from "express";
import { auth } from "../middleware/midAuth.js";
import {
	roomGetAll,
	roomGetByUser,
	roomGetById,
	roomFindOrCreate,
	roomDelete,
	roomDeleteById
} from "../services/roomService.js";
import { MyHttpError } from "../utils/errorBuilders.js";

export const roomRouter = express.Router();

roomRouter.use(auth);

roomRouter.get("/", async (req, res, next) => {
	try {
		const rooms = await roomGetAll();
		res.status(200).json({ rooms });
	} catch (e) {
		next(new MyHttpError(500, "Impossible de récupérer les rooms"));
	}
});

roomRouter.get("/getByUser", async (req, res, next) => {
	if (req.body.userId) {
		try {
			const rooms = await roomGetByUser(req.body.userId);
			res.status(200).json({ rooms });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les rooms de l'utilisateur"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur requis)"));
	}
});

roomRouter.get("/get/:id", async (req, res, next) => {
	if (req.params.id) {
		try {
			const room = await roomGetById(req.params.id);
			res.status(200).json({ room });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer la room"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID room requis)"));
	}
});

roomRouter.post("/create", async (req, res, next) => {
	if (req.body.userId && req.body.friendId && req.body.roomName) {
		try {
			await roomFindOrCreate(
				req.body.userId,
				req.body.friendId,
				req.body.roomName
			);
			res.status(201).json({ message: "Room créée avec succès" });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de créer la room"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur, ID ami et nom de la room requis)"));
	}
});

roomRouter.delete("/delete", async (req, res, next) => {
	if (req.body.userId && req.body.friendId) {
		try {
			await roomDelete(req.body.userId, req.body.friendId);
			res.status(200).json({ message: "Room supprimée avec succès" });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de supprimer la room"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur et ID ami requis)"));
	}
});

roomRouter.delete("/delete/:id", async (req, res, next) => {
	if (req.params.id) {
		try {
			await roomDeleteById(req.params.id);
			res.status(200).json({ message: "Room supprimée avec succès" });
		} catch (e) {
			next(new MyHttpError(500, "Impossible de supprimer la room"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID room requis)"));
	}
});