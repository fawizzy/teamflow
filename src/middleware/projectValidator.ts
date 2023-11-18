import { NextFunction, Request, Response } from "express";
import { z } from "zod";
const projectSchema = z.object({
  projectName: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string(),
});

export const validateProject = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectName, description, startDate, endDate, status } = req.body;
    projectSchema.parse({
      projectName,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status,
    });
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};
