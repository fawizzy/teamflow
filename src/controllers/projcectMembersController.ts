import { Request, Response } from "express";
import { projectMemberInterface } from "../interface/projectMembersInterface";
import { createProjectMemberService } from "../services/projcectMembersSerice";

export const createProjectMemberController = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectId, roleInProject, userId }: projectMemberInterface =
      req.body;

    const projectMember = await createProjectMemberService({
      userId,
      projectId,
      roleInProject,
    });

    return res.status(200).json({ projectMember });
  } catch (error) {
    console.log(error);
  }
};
