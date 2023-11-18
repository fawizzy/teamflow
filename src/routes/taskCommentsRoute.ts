import express from "express";
import { auth } from "../middleware/auth";

import {
  addTaskComment,
  getCommentsByTask,
} from "../controllers/taskCommentsController";
import { validateTaskComment } from "../middleware/taskCommentValidator";
const taskCommentRoute = express.Router();

taskCommentRoute.post(
  "/task/comment",
  auth,
  validateTaskComment,
  addTaskComment
);

taskCommentRoute.get("/task/:id/comments", auth, getCommentsByTask);

module.exports = taskCommentRoute;
