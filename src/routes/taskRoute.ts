import express from "express";
import { auth } from "../middleware/auth";

import {
  addTaskController,
  getTaskByIdController,
  getTaskByProjectIdController,
  getTaskByUserIdController,
} from "../controllers/tasksController";
import { validateTask } from "../middleware/taskValidator";
const taskRoute = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         taskName:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *         userId:
 *           type: string
 *         status:
 *           type: string
 *         priority:
 *           type: string
 *         projectId:
 *           type: string
 */

/**
 * @openapi
 * /api/v1/addtask:
 *   post:
 *     summary: Add a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Task information for addition
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: A successful response with the created Task object
 *         content:
 *           application/json:
 *             example:
 *               taskName: "New Task"
 *               description: "Task description"
 *               dueDate: "2023-12-31"
 *               userId: "1"
 *               status: "In Progress"
 *               priority: "High"
 *               projectId: "1"
 */

/**
 * @openapi
 * /api/v1/task/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
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
 *         description: A successful response with the Task object
 *         content:
 *           application/json:
 *             example:
 *               taskName: "Task 1"
 *               description: "Task description"
 *               dueDate: "2023-12-31"
 *               userId: "1"
 *               status: "In Progress"
 *               priority: "High"
 *               projectId: "1"
 */

/**
 * @openapi
 * /api/v1/task/project/{id}:
 *   get:
 *     summary: Get tasks by project ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with an array of Task objects
 *         content:
 *           application/json:
 *             example:
 *               - taskName: "Task 1"
 *                 description: "Task description"
 *                 dueDate: "2023-12-31"
 *                 userId: "1"
 *                 status: "In Progress"
 *                 priority: "High"
 *                 projectId: "1"
 *               - taskName: "Task 2"
 *                 description: "Task description"
 *                 dueDate: "2023-12-31"
 *                 userId: "2"
 *                 status: "Completed"
 *                 priority: "Low"
 *                 projectId: "1"
 */

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks by user ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with an array of Task objects
 *         content:
 *           application/json:
 *             example:
 *               - taskName: "Task 1"
 *                 description: "Task description"
 *                 dueDate: "2023-12-31"
 *                 userId: "1"
 *                 status: "In Progress"
 *                 priority: "High"
 *                 projectId: "1"
 *               - taskName: "Task 2"
 *                 description: "Task description"
 *                 dueDate: "2023-12-31"
 *                 userId: "1"
 *                 status: "Completed"
 *                 priority: "Low"
 *                 projectId: "2"
 */

taskRoute.post("/addtask", auth, validateTask, addTaskController);
taskRoute.get("/task/:id", auth, getTaskByIdController);
taskRoute.get("/task/project/:id", auth, getTaskByProjectIdController);
taskRoute.get("/tasks", auth, getTaskByUserIdController);

module.exports = taskRoute;
