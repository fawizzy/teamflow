import express from "express";
import { auth } from "../middleware/auth";
import {
  createProjectController,
  getProjectByIdController,
  getProjectByUserController,
} from "../controllers/projectsController";
import { validateProject } from "../middleware/projectValidator";
const projectRoute = express.Router();

projectRoute.post(
  "/createproject",
  auth,
  validateProject,
  createProjectController
);

projectRoute.get("/userprojects", auth, getProjectByUserController);
projectRoute.get("/project/:id", getProjectByIdController);

module.exports = projectRoute;
