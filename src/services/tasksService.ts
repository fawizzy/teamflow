import { connectionSource } from "../database/data-source";
import { Tasks } from "../database/entities/tasks";
import { taskInterface } from "../interface/taskInterface";
import { v4 as uuidv4 } from "uuid";

export const addTaskService = async ({
  taskName,
  description,
  userId,
  dueDate,
  status,
  priority,
  projectId,
}: taskInterface) => {
  try {
    const taskRepository = connectionSource.getRepository(Tasks);
    const newTask = new Tasks();
    newTask.id = uuidv4();
    newTask.taskName = taskName;
    newTask.description = description;
    newTask.userId = userId;
    newTask.dueDate = new Date(dueDate);
    newTask.status = status;
    newTask.priority = priority;
    newTask.projectId = projectId;

    const task = await taskRepository.save(newTask);

    return task;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTaskByIdService = async (id: string) => {
  try {
    const taskRepository = connectionSource.getRepository(Tasks);
    const task = await taskRepository.findOne({ where: { id } });
    return task;
  } catch (error) {
    return error;
  }
};

export const getTaskByProjectService = async (projectId: string) => {
  try {
    const taskRepository = connectionSource.getRepository(Tasks);
    const task = await taskRepository.find({ where: { projectId } });
    return task;
  } catch (error) {
    return error;
  }
};

export const getTaskByUserService = async (userId: string) => {
  try {
    const taskRepository = connectionSource.getRepository(Tasks);
    const task = await taskRepository.find({ where: { userId } });
    return task;
  } catch (error) {
    return error;
  }
};
