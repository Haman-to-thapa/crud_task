import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "./task.dto";
import {
  createTask,
  getTasksForUser,
  updateTask,
  deleteTask
} from "./task.service";

import {
  getTasksWithFilters,
  getDashboardTasks
} from "./task.service";
import { z } from "zod"

export const createTaskHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = createTaskSchema.parse(req.body);
    console.log("Validated data:", data);
    
    // Create task
    const task = await createTask(data, req.userId!);
    
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
    
  } catch (error: any) {
    console.error("Create task error:", error);
    
    // Handle other errors
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create task"
    });
  }
};

export const updateTaskHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const data = updateTaskSchema.parse(req.body);
  const task = await updateTask(req.params.id, req.userId!, data);
  res.json(task);
};

export const deleteTaskHandler = async (
  req: AuthRequest,
  res: Response
) => {
  await deleteTask(req.params.id, req.userId!);
  res.status(204).send();
};

export const getTasksHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const tasks = await getTasksWithFilters(
    req.userId!,
    req.query
  );
  res.json(tasks);
};

export const getDashboardHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const data = await getDashboardTasks(req.userId!);
  res.json(data);
};