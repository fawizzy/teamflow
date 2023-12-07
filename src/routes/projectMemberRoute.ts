import express from "express";
import { auth } from "../middleware/auth";
import { createProjectMemberController } from "../controllers/projcectMembersController";
import { validateProjectMember } from "../middleware/projectMemberValidator";
const projectMemberRoute = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Project Members
 *     description: Operations related to project members
 * components:
 *   schemas:
 *     ProjectMember:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         projectId:
 *           type: string
 *         roleInProject:
 *           type: string
 */

/**
 * @openapi
 * /api/v1/projectMember/addprojectmember:
 *   post:
 *     summary: Add a new project member
 *     tags:
 *       - Project Members
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Project member information for addition
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectMember'
 *     responses:
 *       '200':
 *         description: A successful response with the added project member
 *         content:
 *           application/json:
 *             example:
 *               projectMember:
 *                 userId: "1"
 *                 projectId: "123"
 *                 roleInProject: "member"
 */

projectMemberRoute.post(
  "/addprojectmember",
  auth,
  validateProjectMember,
  createProjectMemberController
);

module.exports = projectMemberRoute;
