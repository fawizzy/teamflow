import { Request, Response } from "express";
import { projectMemberInterface } from "../interface/projectMembersInterface";
import {
  createProjectMemberService,
  deleteProjectMemberByIdService,
} from "../services/projcectMembersSerice";
import { deleteProjectByIdService } from "../services/projectsService";

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

export const deleteProjectMemberById = async (req: Request, res: Response) => {
  try {
    const { projectMemberId } = req.params;
    await deleteProjectMemberByIdService(projectMemberId);
    res.status(200).json("succesfuly deleted");
  } catch (error) {
    res.status(400).json({ error: "error getting project" });
  }
};
