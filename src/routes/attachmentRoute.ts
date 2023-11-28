import express from "express";
import { auth } from "../middleware/auth";
import {
  createAttachment,
  getAttachmentByProjectId,
  getAttachmentByTaskId,
} from "../controllers/attachmentsController";
import { validateAttachment } from "../middleware/attachmentValidator";

const attachmentRoute = express.Router();

attachmentRoute.post(
  "/attachment/upload",
  auth,
  validateAttachment,
  createAttachment
);

attachmentRoute.get(
  "/attachment/project/:projectId",
  auth,
  getAttachmentByProjectId
);

attachmentRoute.get("/attachment/task/:taskId", auth, getAttachmentByTaskId);
module.exports = attachmentRoute;
