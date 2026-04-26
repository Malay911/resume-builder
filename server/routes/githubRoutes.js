import express from "express";
import { githubCallback } from "../controllers/githubController.js";

const githubRouter = express.Router();

// GitHub OAuth callback handler
githubRouter.get("/callback", githubCallback);

export default githubRouter;
