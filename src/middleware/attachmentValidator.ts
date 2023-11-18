import { NextFunction, Request, Response } from "express";
import formidable from "formidable";
import { z } from "zod";
import { attachmentInterface } from "../interface/attachementInterface";
const attachmentSchema = z.object({
  fileName: z.string(),
  taskId: z.string().uuid(),
  projectId: z.string().uuid(),
});

export const validateAttachment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      let { fileName, taskId, projectId }: attachmentInterface = fields;
      if (fileName && taskId && projectId) {
        fileName = fileName[0];
        taskId = taskId[0];
        projectId = projectId[0];
      } else {
        return res.status(400).json({
          error: "fileName, taskId or projectId is undefined",
        });
      }

      try {
        attachmentSchema.parse({
          fileName,
          taskId,
          projectId,
        });
      } catch (error) {
        return res.send(error);
      }
    });
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};
