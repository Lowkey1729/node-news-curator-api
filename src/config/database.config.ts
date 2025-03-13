import { config } from "dotenv";
import type { Dialect } from "sequelize";

config(); // Load environment variables

interface ISequelizeConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

export const dbConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "news_curator_api_db",
  host: process.env.DB_HOST || "localhost",
  dialect: (process.env.DB_DIALECT as Dialect) || "mysql",
};

const sequelizeConfig: ISequelizeConfig = {
  local: dbConfig,
  test: dbConfig,
  production: dbConfig,
};

export default sequelizeConfig;