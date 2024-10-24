import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import res from "express/lib/response.js";
import {MyError} from "../utils/errorBuilders.js";
import Friends from "../models/friends.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = "abCDeFgHIjkLMnOpQrstuVwXYZ";

const US_CODE = 1000;

export const userConnect = async (email, passwd) =>
{
	const user = await Users.findOne({
		where: {email: email}
	});

	if (!user) {
		throw new MyError(US_CODE, "Adresse email invalide");
	}

	const match = bcrypt.compare(passwd, user.password);

	if (match) {
		return jwt.sign({...user}, JWT_SECRET);
	} else {
		throw new MyError(US_CODE + 10, "Mot de passe erroné");
	}
}

export const userCreate = async (firstName, lastName, surname, email, passwd) =>
{
	try {
		const hashPass = await bcrypt.hash(passwd, SALT_ROUNDS);
		await Users.create(
			{
				first_name: firstName,
				last_name: lastName,
				surname: surname,
				email: email,
				password: hashPass
			}
		);

		return true;
	} catch (error) {
		throw new MyError(US_CODE + 100, "Création utilisateur échouée: " + error);
	}
}

export const userGetAllFriends = async (username) =>
{
	const user = await Users.findOne({
		where: {surname: username}
	});
	if (!user) {
		throw new MyError(US_CODE + 200, "Utilisateur introuvable");
	}

	const userFriends = await Friends.findAll({
		where: {user_id: user.user_id}
	});
	if (!userFriends) {
		throw new MyError(US_CODE + 210, "Impossible de récupérer la liste d'amis");
	}

	return userFriends;
}

export const userAddFriend = async (username, friendUsername) =>
{
	const user = await Users.findOne({
		where: {surname: username}
	});
	if (!user) {
		throw new MyError(US_CODE + 300, "Utilisateur introuvable");
	}

	const friend = await Users.findOne({
		where: {surname: friendUsername}
	});
	if (!friend) {
		throw new MyError(US_CODE + 310, "Utilisateur introuvable")
	}

	const userFriend = Friends.create(
		{
			user_id: user.user_id,
			friend_id: friend.user_id,
		}
	);

	const friendUser = Friends.create(
		{
			user_id: friend.user_id,
			friend_id: user.user_id,
		}
	);
	if (!userFriend && !friendUser) {
		throw new MyError(US_CODE + 320, "Création de la relation échouée");
	}

	return true;
}

export const userGetAll = async () =>
{
	const users = await Users.findAll();
	if (!users) {
		throw new MyError(US_CODE + 400, "Impossible de récupérer les utilisateurs");
	}

	return users;
}