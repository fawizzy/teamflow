import { Request, Response } from "express";
import {
  addTaskService,
  getTaskByIdService,
  getTaskByProjectService,
  getTaskByUserService,
} from "../services/tasksService";
import { taskInterface } from "../interface/taskInterface";
import { CustomRequest } from "../interface/customInterface";

export const addTaskController = async (req: Request, res: Response) => {
  try {
    const {
      taskName,
      description,
      dueDate,
      userId,
      status,
      priority,
      projectId,
    }: taskInterface = req.body;

    const addTask = await addTaskService({
      taskName,
      description,
      dueDate,
      userId,
      status,
      priority,
      projectId,
    });

    return res.status(200).json(addTask);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await getTaskByIdService(id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(200).json(error);
  }
};

export const getTaskByProjectIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task = await getTaskByProjectService(id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(200).json(error);
  }
};

export const getTaskByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user?.id;
    let tasks;
    if (userId) tasks = await getTaskByUserService(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(200).json(error);
  }
};
