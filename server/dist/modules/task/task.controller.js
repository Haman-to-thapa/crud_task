"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardHandler = exports.getTasksHandler = exports.deleteTaskHandler = exports.updateTaskHandler = exports.createTaskHandler = void 0;
const task_dto_1 = require("./task.dto");
const task_service_1 = require("./task.service");
const task_service_2 = require("./task.service");
const createTaskHandler = async (req, res) => {
    try {
        const data = task_dto_1.createTaskSchema.parse(req.body);
        console.log("Validated data:", data);
        // Create task
        const task = await (0, task_service_1.createTask)(data, req.userId);
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });
    }
    catch (error) {
        console.error("Create task error:", error);
        // Handle other errors
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create task"
        });
    }
};
exports.createTaskHandler = createTaskHandler;
const updateTaskHandler = async (req, res) => {
    const data = task_dto_1.updateTaskSchema.parse(req.body);
    const task = await (0, task_service_1.updateTask)(req.params.id, req.userId, data);
    res.json(task);
};
exports.updateTaskHandler = updateTaskHandler;
const deleteTaskHandler = async (req, res) => {
    await (0, task_service_1.deleteTask)(req.params.id, req.userId);
    res.status(204).send();
};
exports.deleteTaskHandler = deleteTaskHandler;
const getTasksHandler = async (req, res) => {
    const tasks = await (0, task_service_2.getTasksWithFilters)(req.userId, req.query);
    res.json(tasks);
};
exports.getTasksHandler = getTasksHandler;
const getDashboardHandler = async (req, res) => {
    const data = await (0, task_service_2.getDashboardTasks)(req.userId);
    res.json(data);
};
exports.getDashboardHandler = getDashboardHandler;
