import "reflect-metadata";
import { DataSource } from "typeorm";
import { dbConfigs } from "../configs/dbConfigs";
import { Resource } from "../entities/resource";

// Database connection
export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbConfigs.host,
  port: dbConfigs.port,
  username: dbConfigs.username,
  password: dbConfigs.password,
  database: dbConfigs.database,
  entities: [Resource],
  synchronize: true, // Set to false in production
  logging: false,
});
