import express from "express";
import {
  createUserController,
  getAllUsersController,
  loginController,
} from "../controllers/usersController";
import { validateLogin, validateUser } from "../middleware/userValidator";
const userRoute = express.Router();

userRoute.get("/allusers", getAllUsersController);
userRoute.post("/signup", validateUser, createUserController);
userRoute.post("/login", validateLogin, loginController);

module.exports = userRoute;
