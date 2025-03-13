import { config } from "dotenv";
import type { Dialect } from "sequelize";

config({ path: `.env.${process.env.NODE_ENV || "local"}` });

interface ISequelizeConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port: number;
  };
}

export const dbConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "news_curator_api_db",
  host: process.env.DB_HOST || "localhost",
  dialect: (process.env.DB_DIALECT as Dialect) || "mysql",
  port: Number(process.env.DB_PORT || 3306),
};

const sequelizeConfig: ISequelizeConfig = {
  local: dbConfig,
  test: dbConfig,
  production: dbConfig,
};

export default sequelizeConfig;
