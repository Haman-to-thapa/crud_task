import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.routes";
import { taskRoutes } from "./modules/task/task.routes";
import { errorHandler } from "./middlewares/error.middleware"; 

export const app = express();

app.use(cors({
  origin: ['https://crud-task-1-mp5j.onrender.com', 'http://localhost:5173'],
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);
