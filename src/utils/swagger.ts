import { Express, Request, Response } from "express";
import { version } from "../../package.json";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workout API",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/api/**/*.routes.ts", "./src/schema/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      requestInterceptor: (req) => {
        req.credentials = "include";
        return req;
      },
    })
  );

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
};

export default swaggerDocs;
