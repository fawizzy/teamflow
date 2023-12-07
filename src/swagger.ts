const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Teamflow API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
