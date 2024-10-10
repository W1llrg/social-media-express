import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import res from "express/lib/response.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = "abCDeFgHIjkLMnOpQrstuVwXYZ";

export const userConnect = async (email, passwd) =>
{
	const user = await Users.findOne({
		where: {email: email}
	});

	const match = bcrypt.compare(passwd, user.password);
	if (match) {
		return jwt.sign({...user}, JWT_SECRET);
	} else {
		return false;
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

		return false;
	}
}