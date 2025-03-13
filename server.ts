import express, { Request, Response, Application } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import "@app/database/connection.database"

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/health", (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: "I am alive" });
});

// Start Server
const PORT: number | 5000 = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
