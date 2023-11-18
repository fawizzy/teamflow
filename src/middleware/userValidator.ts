import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const UserRole = z.enum(["user", "admin"]);

const UserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8), // Adjust the password validation rules as needed
  role: UserRole,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UserSchema.parse(req.body);
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
};
