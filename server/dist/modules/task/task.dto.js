"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
// src/modules/task/task.dto.ts
const zod_1 = require("zod");
const task_model_1 = require("./task.model");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(100),
    description: zod_1.z.string().optional().default(""),
    dueDate: zod_1.z.string().or(zod_1.z.date()),
    priority: zod_1.z.nativeEnum(task_model_1.TaskPriority),
    status: zod_1.z.nativeEnum(task_model_1.TaskStatus).optional().default(task_model_1.TaskStatus.TODO),
    assignedToId: zod_1.z.string().optional() // Make it optional
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().max(100).optional(),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.string().or(zod_1.z.date()).optional(),
    priority: zod_1.z.nativeEnum(task_model_1.TaskPriority).optional(),
    status: zod_1.z.nativeEnum(task_model_1.TaskStatus).optional(),
    assignedToId: zod_1.z.string().optional()
});
