import express from "express";
import { auth } from "../middleware/auth";
import {
  createProjectController,
  getProjectByIdController,
  getProjectByUserController,
} from "../controllers/projectsController";
import { validateProject } from "../middleware/projectValidator";
const projectRoute = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Projects
 *     description: Operations related to project management
 *   - name: Project Members
 *     description: Operations related to project members
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         projectName:
 *           type: string
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *
 */

/**
 * @openapi
 * /api/v1/project/createproject:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *       - Project Members
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Project information for creation
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: A successful response with the created project and project member
 *         content:
 *           application/json:
 *             example:
 *               newProject:
 *                 projectName: "New Project"
 *                 description: "Project description"
 *                 startDate: "2023-01-01"
 *                 endDate: "2023-12-31"
 *                 status: "Active"
 *               projectMember:
 *                 userId: "1"
 *                 projectId: "123"
 *                 roleInProject: "owner"
 */

/**
 * @openapi
 * /api/v1/project/userprojects:
 *   get:
 *     summary: Get projects by user ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with an array of projects
 *         content:
 *           application/json:
 *             example:
 *               - projectName: "Project 1"
 *                 description: "Project description"
 *                 startDate: "2023-01-01"
 *                 endDate: "2023-12-31"
 *                 status: "Active"
 *               - projectName: "Project 2"
 *                 description: "Project description"
 *                 startDate: "2023-01-01"
 *                 endDate: "2023-12-31"
 *                 status: "Inactive"
 */

/**
 * @openapi
 * /api/v1/project/project/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response with the project details
 *         content:
 *           application/json:
 *             example:
 *               projectName: "Project 1"
 *               description: "Project description"
 *               startDate: "2023-01-01"
 *               endDate: "2023-12-31"
 *               status: "Active"
 */

/**
 * @openapi
 * /api/v1/project/delete/{projectId}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project to be deleted
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

projectRoute.post(
  "/createproject",
  auth,
  validateProject,
  createProjectController
);

projectRoute.get("/userprojects", auth, getProjectByUserController);
projectRoute.get("/project/:id", getProjectByIdController);

module.exports = projectRoute;
