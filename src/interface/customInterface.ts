import { Request } from "express";
import { userInterface } from "./userInterface";

export type user = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};
export interface CustomRequest extends Request {
  user: userInterface | null;
}
