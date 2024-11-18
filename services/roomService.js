import Rooms from "../models/rooms.js";
import {MyError} from "../utils/errorBuilders.js";

const RM_CODE = 5000;

export const roomGetAll = async (contentId) =>
{
	const rooms = await Rooms.findAll({
		where: {part_of: contentId}
	});
	if (!rooms) {
		throw new MyError(RM_CODE, "Impossible de récupérer les rooms");
	}

	return rooms;
}

export const roomGetByUser = async (userId) =>
{
	const articles = await Rooms.findAll({
		where: {posted_by: userId}
	});
	if (!articles) {
		throw new MyError(RM_CODE + 100, "Impossible de récupérer les articles");
	}

	return articles;
}

export const roomGetById = async (articleId) =>
{
	const article = await Rooms.findOne({
		where: {article_id: articleId}
	});
	if (!article) {
		throw new MyError(RM_CODE + 200, "Impossible de récupérer l'article, ID: " + articleId);
	}

	return article;
}

export const roomCreate = async (title, content, userId, contentId) =>
{
	try {
		const article = await Rooms.create({
			title: title,
			content: content,
			posted_by: userId,
			part_of: contentId
		});

		return true;
	} catch (e) {
		throw new MyError(RM_CODE + 400, "Impossible de créer l'article");
	}
}

export const roomDelete = async (userIdA, userIdB) =>
{
	// TODO
}