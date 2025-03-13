import express, { Request, Response} from "express";
import cors from "cors";
import 'express-async-errors'
import { StatusCodes } from "http-status-codes";
import "@app/database/connection.database"
import {notFoundHandler, setErrorHandler} from "@app/middlewares/error.middleware";
import {logger} from "@app/config/logger.config";
import {server} from "@app/config/app.config";
import routes from './src/routes/index.routes'

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app)


// Health Check Route
app.get("/health", (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "I am alive" });
});

app.use(notFoundHandler);
app.use(setErrorHandler)

// Start Server
app.listen(server.port, () => {
    logger.info('🚀🚀 Server is listening on port %o in %s mode', server.port, server.env)
});
