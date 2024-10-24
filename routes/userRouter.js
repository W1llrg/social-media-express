import express from 'express';
import {userConnect, userCreate} from "../services/userService.js";
import {articleRouter} from "./articleRouter.js";
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

userRouter.get("/friends/getAll", async (req, res) =>
{
	const users = await userGetAllFriends();

	if (!users) {
		res.status(400).send({message: "Impossible de récupérer les utilisateurs"});
	} else {
		res.status(200).json({users});
	}
});

userRouter.get("/friends/get", async (req, res) =>
{
	if (req.body.surname) {
		const userFriends = await userGetFriend();

		if (!userFriends) {
			// TODO
		} else {
			res.status(200).json({userFriends});
		}
	} else {
		res.status(400).send({message: "Requête invalide"});
	}
});