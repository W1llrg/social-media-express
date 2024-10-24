import express from "express";
import {auth} from "../middleware/midAuth.js";

export const contentRouter = express.Router();

contentRouter.use(auth);

contentRouter.get("/getAll", async (req, res) =>
{

});

contentRouter.get("/getAllByUser", async (req, res) =>
{

});

contentRouter.get("/getOneById", async (req, res) =>
{

});
