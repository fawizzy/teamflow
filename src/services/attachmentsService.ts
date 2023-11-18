import { Attachments } from "../database/entities/attachments";
import { connectionSource } from "../database/data-source";
import { attachmentInterface } from "../interface/attachementInterface";
import * as uuid from "uuid";
import { Tasks } from "../database/entities";

export const createAttachmentService = async (
  attachmentObject: attachmentInterface
): Promise<any> => {
  try {
    const { fileName, filePath, taskId, projectId, uploadedBy, uploadDate } =
      attachmentObject;
    const attachmentRepository = connectionSource.getRepository(Attachments);
    const taskRepository = connectionSource.getRepository(Tasks);

    const taskIdBelongToProject = await taskRepository.findOne({
      where: { projectId },
    });

    if (!taskIdBelongToProject) {
      return "task does not belong to project";
    }

    const attachmentExist = await attachmentRepository.findOne({
      where: { fileName },
    });
    if (attachmentExist) {
      return `project with name ${fileName} already exists`;
    }

    const newAttachment = new Attachments();
    newAttachment.fileName = fileName as string;
    newAttachment.taskId = taskId as string;
    newAttachment.projectId = projectId as string;
    newAttachment.uploadedBy = uploadedBy as string;
    newAttachment.filePath = filePath as string;
    newAttachment.uploadDate = uploadDate as Date;

    const savedAttachment: Attachments = await attachmentRepository.save(
      newAttachment
    );

    return savedAttachment;
  } catch (error) {
    console.log(error);
    return error;
  }
};
