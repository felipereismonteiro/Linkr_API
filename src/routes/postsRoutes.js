import { Router } from "express";
import {
  createPost,
  deletePostById,
  getPosts,
  getPostsByHashtag,
  likePost,
  patchPostById,
  putPostById,
} from "../controllers/postsControllers.js";

import { tokenValidation } from "../middlewares/authMiddlewares.js";

import {
  hashtagAlreadyRegisteredValidation,
  hashtagExistenceValidation,
} from "../middlewares/hashtagsMiddlewares.js";
import {
  postExistenceValidation,
  validateDeletePost,
  validatePatchPost,
  validatePostSchema,
  validatePutPost,
} from "../middlewares/postsMiddlewares.js";

export const postsRouter = Router();

postsRouter.post(
  "/posts",
  tokenValidation,
  validatePostSchema,
  hashtagAlreadyRegisteredValidation,
  createPost
);

postsRouter.get("/posts", tokenValidation,getPosts);

postsRouter.get(
  "/posts/:hashtag",
  hashtagExistenceValidation,
  getPostsByHashtag
);

postsRouter.delete(
  "/posts/delete/:id",
  tokenValidation,
  validateDeletePost,
  deletePostById
);

postsRouter.post(
  "/posts/like/:postId",
  tokenValidation,
  postExistenceValidation,
  likePost
);


postsRouter.patch(
  "/posts/update/:id",
  tokenValidation,
  validatePatchPost,
  patchPostById
);
postsRouter.put(
  "/posts/update/:id",
  tokenValidation,
  validatePutPost,
  putPostById
);
