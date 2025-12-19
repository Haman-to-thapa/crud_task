"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getDashboardTasks = exports.getTasksWithFilters = exports.deleteTask = exports.getTasksForUser = exports.createTask = void 0;
const task_repository_1 = require("./task.repository");
const task_model_1 = require("./task.model");
const socket_1 = require("../../socket");
const mongoose_1 = require("mongoose");
const createTask = async (data, creatorId) => {
    const taskData = {
        title: data.title,
        description: data.description || "",
        dueDate: data.dueDate instanceof Date ? data.dueDate : new Date(data.dueDate),
        priority: data.priority,
        status: data.status || task_model_1.TaskStatus.TODO,
        creatorId: new mongoose_1.Types.ObjectId(creatorId),
        assignedToId: new mongoose_1.Types.ObjectId(creatorId)
    };
    if (data.assignedToId && mongoose_1.Types.ObjectId.isValid(data.assignedToId)) {
        taskData.assignedToId = new mongoose_1.Types.ObjectId(data.assignedToId);
    }
    console.log("Creating task with data:", taskData);
    return (0, task_repository_1.createTaskRepo)(taskData);
};
exports.createTask = createTask;
const getTasksForUser = async (userId) => {
    return (0, task_repository_1.getTasksRepo)({
        $or: [{ creatorId: userId }, { assignedToId: userId }]
    });
};
exports.getTasksForUser = getTasksForUser;
const deleteTask = async (taskId, userId) => {
    const task = await (0, task_repository_1.getTaskByIdRepo)(taskId);
    if (!task)
        throw new Error("Task not found");
    if (task.creatorId.toString() !== userId) {
        throw new Error("Only creator can delete");
    }
    await (0, task_repository_1.deleteTaskRepo)(taskId);
};
exports.deleteTask = deleteTask;
const getTasksWithFilters = async (userId, filters) => {
    const query = {
        $or: [{ creatorId: userId }, { assignedToId: userId }]
    };
    if (filters.status)
        query.status = filters.status;
    if (filters.priority)
        query.priority = filters.priority;
    const sort = filters.sort === "dueDate" ? { dueDate: 1 } : {};
    return (0, task_repository_1.getFilteredTasksRepo)(query, sort);
};
exports.getTasksWithFilters = getTasksWithFilters;
const getDashboardTasks = async (userId) => {
    const now = new Date();
    const assigned = await (0, task_repository_1.getFilteredTasksRepo)({ assignedToId: userId }, {});
    const created = await (0, task_repository_1.getFilteredTasksRepo)({ creatorId: userId }, {});
    const overdue = await (0, task_repository_1.getFilteredTasksRepo)({
        assignedToId: userId,
        dueDate: { $lt: now },
        status: { $ne: task_model_1.TaskStatus.COMPLETED }
    }, {});
    return { assigned, created, overdue };
};
exports.getDashboardTasks = getDashboardTasks;
const updateTask = async (taskId, userId, data) => {
    const task = await (0, task_repository_1.getTaskByIdRepo)(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    const isCreator = task.creatorId.toString() === userId;
    const isAssignee = task.assignedToId?.toString() === userId;
    if (!isCreator && !isAssignee) {
        throw new Error("Unauthorized");
    }
    const updatedTask = await (0, task_repository_1.updateTaskRepo)(taskId, data);
    socket_1.io.emit("task:updated", updatedTask);
    if (data.assignedToId &&
        task.assignedToId &&
        data.assignedToId !== task.assignedToId.toString()) {
        socket_1.io.to(data.assignedToId).emit("task:assigned", updatedTask);
    }
    return updatedTask;
};
exports.updateTask = updateTask;
//# sourceMappingURL=task.service.js.map