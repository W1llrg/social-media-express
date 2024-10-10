import express from "express";
import {getAllArticlesByUser, getAllArticlesByContent} from "../services/articleService.js";
import {auth} from "../middleware/midAuth.js";
export const articleRouter = express.Router();

articleRouter.use(auth);

articleRouter.get("/getAllByContent", async (req, res) => {
	if (req.body.contentId) {
		const list = await getAllArticlesByContent(req.body.contentId);
		
		res.status(200).json(list);
	} else {
		res.status(400).send({message:"no content found"});
	}
});

articleRouter.get("/getAllByUser", async (req, res) => {

});