import Logger from "pino";
import { Environment } from "../shared/enum";
import dayjs from "dayjs";
import { server } from "@app/config/app.config";

const logger = Logger({
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss")}"`,
  transport: {
    target: server.env === Environment.LOCAL ? "pino-pretty" : "pino/file",
  },
});

export { logger };
