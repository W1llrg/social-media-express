import express from "express";
import {auth} from "../middleware/midAuth.js";

export const commentRouter = express.Router();

commentRouter.use(auth);

commentRouter.get("/getAll", async (req, res) =>
{

});

commentRouter.get("/getAllByUser", async (req, res) =>
{

});

commentRouter.get("/getOneById", async (req, res) =>
{

});
