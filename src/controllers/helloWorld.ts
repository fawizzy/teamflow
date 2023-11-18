import express, { Request, RequestHandler, Response } from "express";
import { helloWorldService } from "../services/indexService";

export const helloWorldController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const data = helloWorldService();
  return res.send(data);
};
