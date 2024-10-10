import express from 'express';
import {userConnect, userCreate} from "../services/userService.js";

export const userRouter = express.Router();

userRouter.post("/login", async (req, res) =>
{
	if (req.body.email && req.body.password) {
		const token = await userConnect(req.body.email, req.body.password);
		res.status(200).json({token});
	} else {
		res.status(401).send({message: "identifiants invalides"});
	}
});

userRouter.post("/register", async (req, res) =>
{
	if (req.body.email && req.body.password) {
		const user = await userCreate(
			req.body.firstName,
			req.body.lastName,
			req.body.surname,
			req.body.email,
			req.body.password
		);
		if (!user) {
			res.status(401).send({message: "resultat invalide"});
		} else {
			res.status(201).json({message: `creation user: ${req.body.email}`});
		}
	} else {
		res.status(400).send({error: 400});
	}
});