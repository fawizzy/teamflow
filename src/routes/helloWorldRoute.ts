import { helloWorldController } from "../controllers";
import express from "express";
const router = express.Router();

router.get("/", helloWorldController);

module.exports = router;
