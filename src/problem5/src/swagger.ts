import swaggerJSDoc from "swagger-jsdoc";
import { configs } from "./configs/configs";
import { metadata } from "./configs/metadata";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: metadata.name,
    version: metadata.version,
    description: "A simple server",
  },
  servers: [
    {
      url: `http://localhost:${configs.port}`,
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "About",
      description: "General information about the server",
    },
    {
      name: "Resource",
      description: "View and manage resources",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
  failOnErrors: true,
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
