import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { CustomRequest } from "../interface/customInterface";
const taskCommentSchema = z.object({
  commentText: z.string(),
  taskId: z.string(),
  userId: z.string(),
});

export const validateTaskComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id as string;
    const { commentText, taskId } = req.body;

    taskCommentSchema.parse({ commentText, userId, taskId });
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};
