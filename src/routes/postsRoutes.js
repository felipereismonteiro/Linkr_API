import { Router } from "express";
import { createPost, getPosts } from "../controllers/postsControllers.js";
import { hashtagAlreadyRegisteredValidation } from "../middlewares/hashtagsMiddlewares.js";
import { validatePostSchema } from "../middlewares/postsMiddlewares.js";

export const postsRouter = Router();

postsRouter.post(
  "/posts",
  validatePostSchema,
  hashtagAlreadyRegisteredValidation,
  createPost
);
// postsRouter.post("/posts", validatePostSchema, createPost);
postsRouter.get("/posts", getPosts);
