import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { projectMemberInterface } from "../interface/projectMembersInterface";
const projectMemberSchema = z.object({
  projectId: z.string().uuid(),
  userId: z.string().uuid(),
  roleInProject: z.string(),
});

export const validateProjectMember = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, projectId, roleInProject }: projectMemberInterface =
      req.body;
    projectMemberSchema.parse({
      userId,
      projectId,
      roleInProject,
    });
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};
