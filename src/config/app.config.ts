import { Environment } from "../shared/enum";

export const server = {
  name: process.env.APP_NAME || "news-curator-api",
  port: Number(process.env.PORT) || 3001,
  env: process.env.APP_ENV as Environment,
};
