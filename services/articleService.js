import Articles from "../models/articles.js";

export const getAllArticlesByContent = async (contentId) =>
{
	try {
		return await Articles.findAll({
			where: {article_id: contentId}
		});
	} catch (error) {
		return 100000;
	}
}

export const getAllArticlesByUser = async (userId) =>
{
	try {
		return await Articles.findAll({
			where: {posted_by: userId}
		});
	} catch (error) {
		return 110000;
	}
}	