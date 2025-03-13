import { dbConfig } from "@app/config/database.config";
import { Sequelize } from "sequelize-typescript";
import path from "path";
import { logger } from "@app/config/logger.config";
import * as process from "node:process";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
          host: dbConfig.host,
          dialect: dbConfig.dialect,
          models: [path.join(__dirname, "../models/**/*.model.ts")],
          logging: false,
            port: dbConfig.port
        },
      );

      Database.instance
        .authenticate()
        .then(() => {
          if (process.env.NODE_ENV !== "test") {
            logger.info("🚀🚀 %s db connected successfully!", dbConfig.dialect);
          }
        })
        .catch((err) => {
          console.error("Database connection error:", err);
        });
    }

    return Database.instance;
  }
}

export const sequelize = Database.getInstance();
export default sequelize;
