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

taskRoute.post("/addtask", auth, validateTask, addTaskController);
taskRoute.get("/task/:id", auth, getTaskByIdController);
taskRoute.get("/task/project/:id", auth, getTaskByProjectIdController);
taskRoute.get("/tasks", auth, getTaskByUserIdController);

module.exports = taskRoute;
