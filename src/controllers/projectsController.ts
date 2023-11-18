import { NextFunction, Request, RequestHandler, Response } from "express";
import { projectInterface } from "../interface/projectInterface";
import {
  createProjectService,
  getProjectByIdService,
  getProjectByUserService,
} from "../services/projectsService";
import { promises } from "dns";
import { projectMemberInterface } from "../interface/projectMembersInterface";
import { createProjectMemberService } from "../services/projcectMembersSerice";
import { Projects } from "../database/entities/projects";
import { CustomRequest } from "../interface/customInterface";
import { userInterface } from "../interface/userInterface";

export const createProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId: string = customReq.user?.id as string;
    const {
      projectName,
      description,
      startDate,
      endDate,
      status,
    }: projectInterface = req.body;
    const newProject = await createProjectService({
      projectName,
      description,
      startDate,
      endDate,
      status,
    });
    console.log(userId);
    const projectMember = await createProjectMemberService({
      userId,
      projectId: newProject.id,
      roleInProject: "owner",
    });

    return res.status(200).json({ newProject, projectMember });
  } catch (error) {
    console.log(error);
  }
};

export const getProjectByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id;
    let projects = null;
    if (userId) {
      projects = await getProjectByUserService(userId);
    }
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProjectByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const project = await getProjectByIdService(id);
  return res.status(200).json(project);
};
