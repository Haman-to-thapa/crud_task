// src/api/task.api.ts
import { api } from "../lib/axios";
import type { CreateTaskPayload } from "../types/auth";
import { type Task } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data.tasks || res.data; 
};

export const getDashboardTasks = async (): Promise<{
  assigned: Task[];
  created: Task[];
  overdue: Task[];
}> => {
  const res = await api.get("/tasks/dashboard");
  return res.data;
};

export const createTask = async (
  payload: CreateTaskPayload
): Promise<Task> => {
  const res = await api.post("/tasks", payload);
  return res.data.task || res.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};