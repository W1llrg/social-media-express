import Contents from "../models/contents.js";
import {MyError} from "../utils/errorBuilders.js";

const CoS_CODE = 4000;

export const contentGetAll = async () =>
{
	const contents = await Contents.findAll({});
	if (!contents) {
		throw new MyError(CoS_CODE, "Impossible de récupérer les contenus");
	}

	return contents;
}

export const contentGetAllByUser = async (userId) =>
{
	const contents = await Contents.findAll({
		where: {created_by: userId}
	});
	if (!contents) {
		throw new MyError(CoS_CODE + 100, "Impossible de récupérer les contenus");
	}

	return contents;
}

export const contentGetById = async (contentId) =>
{
	const content = await Contents.findOne({
		where: {content_id: contentId}
	});
	if (!content) {
		throw new MyError(CoS_CODE + 200, "Impossible de récupérer le contenu, ID: " + contentId);
	}

	return content;
}

export const contentCreate = async (title, userId) =>
{
	const content = await Contents.create({
		title: title,
		created_by: userId
	});
	if (!content) {
		throw new MyError(CoS_CODE + 300, "Création du contenu échouée");
	}

	return true;
}