import express from 'express';
import {
	userAddFriend,
	userConnect,
	userCreate,
	userGetAll,
	userGetAllFriends,
	userUpdatePassword
} from "../services/userService.js";
import {MyHttpError} from "../utils/errorBuilders.js";

export const userRouter = express.Router();

userRouter.post("/login", async (req, res, next) =>
{
	if (req.body.email && req.body.password) {
		try {
			const token = await userConnect(req.body.email, req.body.password);
			res.status(200).json({token});
		} catch (e) {
			next(new MyHttpError(401, "Identifiants incorrects"));
		}
	} else {
		next(MyHttpError(400, "Requête mal formulée (email et mot de passe requis)"));
	}
});

userRouter.post("/register", async (req, res, next) =>
{
	if (req.body.email && req.body.password) {
		try {
			const user = await userCreate(
				req.body.firstName,
				req.body.lastName,
				req.body.surname,
				req.body.email,
				req.body.password
			);

			res.status(201).json({message: `Nouvel utilisateur: ${req.body.email}`});
		} catch (e) {
			next(new MyHttpError(400, "Requête mal formulée"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (email et mot de passe requis)"));
	}
});

userRouter.get("/friends/getAll/:username", async (req, res, next) =>
{
	const username = req.params.username;

	if (username) {
		try {
			const users = await userGetAllFriends(username);

			res.status(200).json({users});
		} catch (e) {
			next(new MyHttpError(500, "Impossible de récupérer les amis de l'utilisateur " + req.body.surname));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (nom d'utilisateur requis)"));
	}
});

userRouter.post("/friends/add", async (req, res, next) =>
{
	if (req.body.username && req.body.friendUsername) {
		try {
			const relation = await userAddFriend(req.body.username, req.body.friendUsername);

			res.status(200).json({message: "Relation créée"});
		} catch (error) {
			next(new MyHttpError(500, "Impossible de créer la relation"));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (noms d'utilisateur requis)"));
	}
});

userRouter.post("/updatePassword", async (req, res, next) =>
{
	if (req.body.password && req.body.userId) {
		try {
			const user = await userUpdatePassword(req.body.userId, req.body.password);

			res.status(200).json({message: "Mot de passe mis à jour"});
		} catch (error) {
			next(new MyHttpError(500, "Impossible de changer le mot de passe: " + error));
		}
	} else {
		next(new MyHttpError(400, "Requête mal formulée (ID utilisateur et nouveau MDP requis)"));
	}
});

userRouter.get("/", async (req, res, next) =>
{
	try {
		const users = await userGetAll();

		res.status(200).json({users});
	} catch (e) {
		next(new MyHttpError(500, "Erreur lors de l'exécution"))
	}
});