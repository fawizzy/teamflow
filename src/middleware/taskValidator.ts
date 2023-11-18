import { NextFunction, Request, Response } from "express";
import { z } from "zod";
const taskSchema = z.object({
  taskName: z.string(),
  description: z.string(),
  userId: z.string(),
  dueDate: z.date(),
  status: z.string(),
  priority: z.string(),
  projectId: z.string(),
});

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      taskName,
      description,
      userId,
      dueDate,
      status,
      priority,
      projectId,
    } = req.body;

    taskSchema.parse({
      taskName,
      description,
      userId,
      dueDate: new Date(dueDate),
      status,
      priority,
      projectId,
    });
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};
