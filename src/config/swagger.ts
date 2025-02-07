import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Teix Store API",
      version: "1.0.0",
      description: "Documentação da API da Teix Store",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./src/routes/*.ts"], // Aponta para os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
