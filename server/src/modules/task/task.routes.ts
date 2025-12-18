import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  createTaskHandler,
  getTasksHandler,
  updateTaskHandler,
  deleteTaskHandler
} from "./task.controller";
import { getDashboardHandler } from "./task.controller";

export const taskRoutes = Router();

taskRoutes.use(requireAuth);

taskRoutes.post("/", createTaskHandler);
taskRoutes.get("/", getTasksHandler);
taskRoutes.patch("/:id", updateTaskHandler);
taskRoutes.delete("/:id", deleteTaskHandler);
taskRoutes.get("/dashboard", getDashboardHandler);
