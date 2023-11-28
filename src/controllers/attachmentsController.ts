import { Request, Response } from "express";
import formidable, { errors as formidableErrors } from "formidable";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import {
  createAttachmentService,
  getAttachmentByProjectIdService,
  getAttachmentByTaskIdService,
} from "../services/attachmentsService";
import { CustomRequest } from "../interface/customInterface";
import { attachmentInterface } from "../interface/attachementInterface";

const cloud_name = process.env.CLOUDINARY_NAME;
const api_key = process.env.CLOUDINARY_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export const createAttachment = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  const userId = customReq.user?.id as string;
  try {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }
      let mimetype: string;
      let filepath: string;

      if (files.file) {
        mimetype = files.file[0].mimetype as string;
        filepath = files.file[0].filepath;

        cloudinary.uploader.upload(
          filepath,
          {
            public_id: files.file[0].originalFilename as string,
            resource_type: "raw",
          },
          async (error, result) => {
            if (error) {
              return res.status(400).json(error);
            }

            if (fields) {
              let { fileName, taskId, projectId }: attachmentInterface = fields;
              const filePath = result?.secure_url as string;
              let uploadDate = new Date();
              let uploadedBy = userId;
              if (fileName && taskId && projectId) {
                fileName = fileName[0];
                taskId = taskId[0];
                projectId = projectId[0];
              } else {
                return res.status(400).json({
                  error: "fileName, taskId or projectId is undefined",
                });
              }

              const newAttachment = await createAttachmentService({
                fileName,
                taskId,
                projectId,
                filePath,
                uploadDate,
                uploadedBy,
              });
              return res.status(200).json(newAttachment);
            }
          }
        );
      }
    });
  } catch (error) {
    res.send(error);
    return error;
  }
};

export const getAttachmentByProjectId = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const attachment = await getAttachmentByProjectIdService(projectId);
    res.status(200).json(attachment);
  } catch (error) {
    res.status(400).json({ error: "error getting attachment" });
  }
};

export const getAttachmentByTaskId = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const attachment = await getAttachmentByTaskIdService(taskId);
    res.status(200).json(attachment);
  } catch (error) {
    res.status(400).json({ error: "error getting attachment" });
  }
};
