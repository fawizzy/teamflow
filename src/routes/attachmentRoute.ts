import express from "express";
import { auth } from "../middleware/auth";
import { createAttachment } from "../controllers/attachmentsController";
import { validateAttachment } from "../middleware/attachmentValidator";

const attachmentRoute = express.Router();

attachmentRoute.post(
  "/attachment/upload",
  auth,
  validateAttachment,
  createAttachment
);

module.exports = attachmentRoute;
