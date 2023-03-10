import { Router } from "express";
import commentControllers from "../controllers/commentControllers.js";
import { tokenValidation } from "../middlewares/authMiddlewares.js";
import commentMiddleware from "../middlewares/commentMiddlewares.js";

export const commentsRoute = Router();

commentsRoute.post("/posts/comment/:id", tokenValidation, commentMiddleware, commentControllers);
