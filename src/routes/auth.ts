import express from "express";
import { auth } from "../middleware/auth";

const authRoute = express.Router();

//authRoute.get("/auth", auth);

module.exports = authRoute;
