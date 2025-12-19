import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.routes";
import { taskRoutes } from "./modules/task/task.routes";
import { errorHandler } from "./middlewares/error.middleware"; 

export const app = express();

const corsOptions = {
  origin: [
    'https://crud-task-1-mp5j.onrender.com', // Your frontend URL
    'http://localhost:3000', // For local development
  ],
  credentials: true, // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie'] // Expose cookies to frontend
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);
