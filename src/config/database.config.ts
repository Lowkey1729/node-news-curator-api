import { Dialect } from "sequelize";

export const db = {
  db_host: process.env.DB_HOST || "localhost",
  db_user: process.env.DB_USER || "root",
  db_password: process.env.DB_PASSWORD || "password",
  db_name: process.env.DB_NAME || "news_curator_api_db",
  db_dialect: (process.env.DB_DIALECT as Dialect) || "mysql",
};

export default db;
