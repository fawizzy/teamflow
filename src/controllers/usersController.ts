import express, { Request, RequestHandler, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  loginService,
} from "../services/usersService";

export const getAllUsersController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByIdController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const newUser: any = await createUserService({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    if (!newUser) {
      return res.status(403).json("email already exist");
    }

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const login = await loginService({ email, password });
    if (login === "invalid password") {
      return res.status(403).json(login);
    }
    if (login === "email is not registered") {
      return res.status(403).json(login);
    }
    res.status(200).json(login);
  } catch (error) {
    console.log(error);
    return error;
  }
};
