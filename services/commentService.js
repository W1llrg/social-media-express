import Comments from "../models/comments.js";
import {MyError} from "../utils/errorBuilders.js";
import {userGetAllFriends} from "./userService.js";
import {articleGetAllByUser} from "./articleService.js";

const CS_CODE = 3000;

export const commentGetAll = async () =>
{
	const comments = await Comments.findAll({});
	if (!comments) {
		throw new MyError(CS_CODE, "Impossible de récupérer les commentaires");
	}

	return comments;
}

export const commentGetAllByUser = async (userId) =>
{
	const comments = await Comments.findAll({
		where: {posted_by: userId}
	});
	if (!comments) {
		throw new MyError(CS_CODE + 100, "Impossible de récupérer les commentaires");
	}

	return comments;
}

export const commentGetAllByUserFriend = async (userId) =>
{
	let friends;
	try {
		friends = await userGetAllFriends(userId);
	} catch (e) {
		console.error(e);
	}

	try {
		let comments = [];
		for (let i = 0; i < friends.length; i++) {
			const friendComments = articleGetAllByUser(friends[i].user_id);
			comments = comments.concat(comments);
		}

		return comments;
	} catch (e) {
		throw new MyError(CS_CODE + 400, "Impossible de récupérer tous les comments");
	}
}

export const commentGetById = async (commentId) =>
{
	const comment = await Comments.findOne({
		where: {comment_id: commentId}
	});
	if (!comment) {
		throw new MyError(CS_CODE + 200, "Impossible de récupérer le commentaire, ID: " + commentId);
	}

	return comment;
}

export const commentCreate = async (content, userId, articleId) =>
{
	const comment = await Comments.create({
		content: content,
		posted_by: userId,
		on_article: articleId
	});
	if (!comment) {
		throw new MyError(CS_CODE + 300, "Création du commentaire échouée");
	}

	return true;
}