import { Request, Response } from "express";
import { taskCommentInterface } from "../interface/taskCommentInterface";
import { CustomRequest } from "../interface/customInterface";
import {
  addTaskCommentService,
  getTaskCommentByTaskService,
} from "../services/taskCommentsService";

export const addTaskComment = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id as string;
    const { commentText, taskId }: taskCommentInterface = req.body;
    const addComment = await addTaskCommentService({
      commentText,
      userId,
      taskId,
    });
    res.status(200).json({ addComment });
  } catch (error) {
    return error;
  }
};

export const getCommentsByTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await getTaskCommentByTaskService(id);
    return res.status(200).json(comment);
  } catch (error) {}
};
