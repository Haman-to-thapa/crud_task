import { UpdateQuery } from "mongoose";
import { ITask } from "./task.model";
export declare const createTaskRepo: (data: Partial<ITask>) => Promise<ITask>;
export declare const getTasksRepo: (filter: any) => Promise<ITask[]>;
export declare const getTaskByIdRepo: (id: string) => Promise<ITask | null>;
export declare const updateTaskRepo: (id: string, data: UpdateQuery<ITask>) => Promise<ITask | null>;
export declare const deleteTaskRepo: (id: string) => Promise<void>;
export declare const getFilteredTasksRepo: (filter: any, sort: Record<string, 1 | -1>) => Promise<ITask[]>;
