import { UpdateQuery } from "mongoose";
import { Task, ITask } from "./task.model";

export const createTaskRepo = async (
  data: Partial<ITask>
): Promise<ITask> => {
  return Task.create(data);
};

export const getTasksRepo = async (filter: any): Promise<ITask[]> => {
  return Task.find(filter).sort({ dueDate: 1 });
};

export const getTaskByIdRepo = async (
  id: string
): Promise<ITask | null> => {
  return Task.findById(id);
};

export const updateTaskRepo = async (
  id: string,
  data: UpdateQuery<ITask>
): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTaskRepo = async (id: string): Promise<void> => {
  await Task.findByIdAndDelete(id);
};

export const getFilteredTasksRepo = async (
  filter: any,
  sort: Record<string, 1 | -1>
): Promise<ITask[]> => {
  return Task.find(filter).sort(sort);
};
