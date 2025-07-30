// Load env from env.env file. In prod, this one needs to be removed
import dotenv from "dotenv";

dotenv.config({ path: "env.env" });

// Import other libs
import { AppDataSource } from "./db/datasource";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import resourceRouter from "./routes/resource";
import generalRouter from "./routes/general";
import { configs } from "./configs/configs";
import { randomUUID } from "node:crypto";
import responseTime from "response-time";

const app = express();

// Configs for Swagger UI
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID();
  res.setHeader("X-Request-ID", requestId);
  next();
});
app.use(responseTime({ digits: 6, header: "X-Response-Time", suffix: true }));

// Import main routes
app.use("/", generalRouter);
app.use("/", resourceRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");
    app.listen(configs.port, () => {
      console.log(`Server is running at port ${configs.port}`);
    });
  })
  .catch((error) => {
    console.error("Error while connect to database: ", error);
  });
