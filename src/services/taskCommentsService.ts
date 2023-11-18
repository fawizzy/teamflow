import { TaskComments } from "../database/entities";
import { connectionSource } from "../database/data-source";
import { v4 as uuidv4 } from "uuid";
import { taskCommentInterface } from "../interface/taskCommentInterface";

export const addTaskCommentService = async ({
  commentText,
  userId,
  taskId,
}: taskCommentInterface) => {
  try {
    const taskCommentRepository = connectionSource.getRepository(TaskComments);
    const newTaskComment = new TaskComments();

    newTaskComment.id = uuidv4();
    newTaskComment.commentText = commentText;
    newTaskComment.timestamp = new Date();
    newTaskComment.userId = userId;
    newTaskComment.taskId = taskId;

    const taskComment = await taskCommentRepository.save(newTaskComment);

    return taskComment;
  } catch (error) {
    return error;
  }
};

export const getTaskCommentByTaskService = async (taskId: string) => {
  try {
    const taskCommentRepository = connectionSource.getRepository(TaskComments);

    const taskComments = taskCommentRepository.find({
      where: {
        taskId,
      },
    });

    return taskComments;
  } catch (error) {
    return error;
  }
};
