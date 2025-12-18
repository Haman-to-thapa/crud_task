// src/modules/task/task.dto.ts
import { z } from "zod";
import { TaskPriority, TaskStatus } from "./task.model";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().optional().default(""),
  dueDate: z.string().or(z.date()),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus).optional().default(TaskStatus.TODO),
  assignedToId: z.string().optional() // Make it optional
});

export const updateTaskSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().optional(),
  dueDate: z.string().or(z.date()).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedToId: z.string().optional()
});