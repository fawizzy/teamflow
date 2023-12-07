import "reflect-metadata";
import express from "express";
import { helloWorldController } from "./controllers/helloWorld";
import { connectionSource } from "./database/data-source";
const userRoute = require("./routes/userRoute");
const projectMemberRoute = require("./routes/projectMemberRoute");
const projectRoute = require("./routes/projectRoute");
const taskRoute = require("./routes/taskRoute");
const taskComment = require("./routes/taskCommentsRoute");
const attachmentRoute = require("./routes/attachmentRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");

const app = express();
const port = process.env.PORT;

//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Define a route
app.use(express.json());
app.get("/", helloWorldController);
app.use("/api/v1", userRoute);
app.use("/api/v1", projectRoute);
app.use("/api/v1", projectMemberRoute);
app.use("/api/v1", taskRoute);
app.use("/api/v1", taskComment);
app.use("/api/v1", attachmentRoute);

//connect database

connectionSource
  .initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
