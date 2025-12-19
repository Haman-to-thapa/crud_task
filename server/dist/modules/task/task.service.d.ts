import { ITask } from "./task.model";
export declare const createTask: (data: any, creatorId: string) => Promise<ITask>;
export declare const getTasksForUser: (userId: string) => Promise<ITask[]>;
export declare const deleteTask: (taskId: string, userId: string) => Promise<void>;
export declare const getTasksWithFilters: (userId: string, filters: any) => Promise<ITask[]>;
export declare const getDashboardTasks: (userId: string) => Promise<{
    assigned: ITask[];
    created: ITask[];
    overdue: ITask[];
}>;
export declare const updateTask: (taskId: string, userId: string, data: any) => Promise<ITask | null>;
