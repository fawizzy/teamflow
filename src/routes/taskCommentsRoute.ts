import express from "express";
import { auth } from "../middleware/auth";

import {
  addTaskComment,
  getCommentsByTask,
} from "../controllers/taskCommentsController";
import { validateTaskComment } from "../middleware/taskCommentValidator";
const taskCommentRoute = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Task Comments
 *     description: Operations related to task comments
 * components:
 *   schemas:
 *     TaskComment:
 *       type: object
 *       properties:
 *         commentText:
 *           type: string
 *         taskId:
 *           type: string
 *
 */

/**
 * @openapi
 * /api/v1/task/comment:
 *   post:
 *     summary: Add a new task comment
 *     tags:
 *       - Task Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Task comment information for addition
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskComment'
 *     responses:
 *       '200':
 *         description: A successful response with the added task comment
 *         content:
 *           application/json:
 *             example:
 *               addComment:
 *                 commentText: "New comment"
 *                 userId: "1"
 *                 taskId: "123"
 */

/**
 * @openapi
 * /api/v1/task/:id/comments:
 *   get:
 *     summary: Get comments by task ID
 *     tags:
 *       - Task Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with an array of task comments
 *         content:
 *           application/json:
 *             example:
 *               - commentText: "Comment 1"
 *                 userId: "1"
 *                 taskId: "123"
 *               - commentText: "Comment 2"
 *                 userId: "2"
 *                 taskId: "123"
 */

/**
 * @openapi
 * /api/v1/task/comment/:taskId:
 *   delete:
 *     summary: Delete a task comment by task ID
 *     tags:
 *       - Task Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task comment to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response indicating deletion
 *         content:
 *           application/json:
 *             example: "Successfully deleted"
 *       '400':
 *         description: An error response indicating a problem with the request
 *         content:
 *           application/json:
 *             example:
 *               error: "Error getting project"
 */

taskCommentRoute.post(
  "/task/comment",
  auth,
  validateTaskComment,
  addTaskComment
);

taskCommentRoute.get("/task/:id/comments", auth, getCommentsByTask);

module.exports = taskCommentRoute;
