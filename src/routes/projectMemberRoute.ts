import express from "express";
import { auth } from "../middleware/auth";
import { createProjectMemberController } from "../controllers/projcectMembersController";
import { validateProjectMember } from "../middleware/projectMemberValidator";
const projectMemberRoute = express.Router();

projectMemberRoute.post(
  "/addprojectmember",
  auth,
  validateProjectMember,
  createProjectMemberController
);

module.exports = projectMemberRoute;
