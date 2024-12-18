import Articles from "../models/articles.js";
import {MyError} from "../utils/errorBuilders.js";
import {userGetAllFriends} from "./userService.js";

const AS_CODE = 2000;

export const articleGetAllByContent = async (contentId) =>
{
	const articles = await Articles.findAll({
		where: {part_of: contentId}
	});
	if (!articles) {
		throw new MyError(AS_CODE, "Impossible de récupérer les articles");
	}

	return articles;
}

export const articleGetAllByUser = async (userId) =>
{
	const articles = await Articles.findAll({
		where: {posted_by: userId}
	});
	if (!articles) {
		throw new MyError(AS_CODE + 100, "Impossible de récupérer les articles");
	}

	return articles;
}

export const articleGetById = async (articleId) =>
{
	const article = await Articles.findOne({
		where: {article_id: articleId}
	});
	if (!article) {
		throw new MyError(AS_CODE + 200, "Impossible de récupérer l'article, ID: " + articleId);
	}

	return article;
}

export const articleGetAllByUserFriend = async (userId) =>
{
	let friends;
	try {
		friends = await userGetAllFriends(userId);
	} catch (e) {
		console.error(e);
	}

	try {
		let articles = [];
		for (let i = 0; i < friends.length; i++) {
			const friendArticles = articleGetAllByUser(friends[i].user_id);
			articles = articles.concat(articles);
		}

		return articles;
	} catch (e) {
		throw new MyError(AS_CODE + 500, "Impossible de récupérer tous les articles");
	}
}

export const articleGetAll = async () =>
{
	const articles = await Articles.findAll({});
	if (!articles) {
		throw new MyError(AS_CODE + 300, "Impossible de récupérer les articles");
	}

	return articles;
}

export const articleCreate = async (title, content, userId, contentId) =>
{
	try {
		const article = await Articles.create({
			title: title,
			content: content,
			posted_by: userId,
			part_of: contentId
		});

		return true;
	} catch (e) {
		throw new MyError(AS_CODE + 400, "Impossible de créer l'article");
	}
}