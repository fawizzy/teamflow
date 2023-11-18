import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "../utils/jwt";
import { getUserByIdService } from "../services/usersService";
import { userInterface } from "../interface/userInterface";
import { CustomRequest } from "../interface/customInterface";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { authorization } = customReq.headers;
    const token = authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = verify(token);
    const user: userInterface | null = await getUserByIdService(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    customReq.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "unauthorized" });
  }
};
