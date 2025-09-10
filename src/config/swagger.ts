// swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API REST",
    version: "1.0.0",
    description: "Documentação da API com Swagger",
  },
  servers: [
    { url: "http://localhost:3000" }
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
