import { z } from "zod";
import { TaskPriority, TaskStatus } from "./task.model";
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    dueDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    priority: z.ZodEnum<typeof TaskPriority>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<typeof TaskStatus>>>;
    assignedToId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    priority: z.ZodOptional<z.ZodEnum<typeof TaskPriority>>;
    status: z.ZodOptional<z.ZodEnum<typeof TaskStatus>>;
    assignedToId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
