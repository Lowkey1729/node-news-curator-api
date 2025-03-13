import { dbConfig } from "@app/config/database.config";
import { Sequelize } from "sequelize-typescript";
import path from "path";
import { logger } from "@app/config/logger.config";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    models: [path.join(__dirname, "../models/**/*.model.ts")],
    logging: false,
  },
);

const connection = () => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info("🚀🚀 %s db connected successfully!", dbConfig.dialect);
    })
    .catch((err) => {
      console.error(err);
    });
};

connection();

export default sequelize;
