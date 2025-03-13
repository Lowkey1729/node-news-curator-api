import express, { Request, Response} from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import "@app/database/connection.database"
import {setErrorHandler} from "@app/middlewares/error.middleware";
import {logger} from "@app/config/logger.config";
import {server} from "@app/config/app.config";
import routes from './src/routes/index.routes'

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setErrorHandler)

routes(app)

// Health Check Route
app.get("/health", (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "I am alive" });
});

// Start Server
app.listen(server.port, () => {
    logger.info('🚀🚀 Server is listening on port %o in %s mode', server.port, server.env)
});
