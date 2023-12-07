import express from "express";
import {
  createUserController,
  getAllUsersController,
  loginController,
} from "../controllers/usersController";
import { validateLogin, validateUser } from "../middleware/userValidator";
const userRoute = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 */

/**
 * @openapi
 * /api/v1/allusers:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: A successful response with an array of User objects
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 email: "john@example.com"
 *                 password: "hashed_password"
 *                 role: "user"
 *               - id: "2"
 *                 firstName: "Jane"
 *                 lastName: "Doe"
 *                 email: "jane@example.com"
 *                 password: "hashed_password"
 *                 role: "admin"
 */

/**
 * @openapi
 * /api/v1/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       description: User information for registration
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: A successful response with the created User object
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               firstName: "New"
 *               lastName: "User"
 *               email: "newuser@example.com"
 *               password: "hashed_password"
 *               role: "user"
 *       '403':
 *         description: User with the provided email already exists
 */

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       description: User credentials for login
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response with login details
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               token: "jwt_token"
 *       '403':
 *         description: Invalid password or email is not registered
 */

// Assuming userRoute is your Express Router

userRoute.get("/allusers", getAllUsersController);
userRoute.post("/signup", validateUser, createUserController);
userRoute.post("/login", validateLogin, loginController);

module.exports = userRoute;
