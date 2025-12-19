"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredTasksRepo = exports.deleteTaskRepo = exports.updateTaskRepo = exports.getTaskByIdRepo = exports.getTasksRepo = exports.createTaskRepo = void 0;
const task_model_1 = require("./task.model");
const createTaskRepo = async (data) => {
    return task_model_1.Task.create(data);
};
exports.createTaskRepo = createTaskRepo;
const getTasksRepo = async (filter) => {
    return task_model_1.Task.find(filter).sort({ dueDate: 1 });
};
exports.getTasksRepo = getTasksRepo;
const getTaskByIdRepo = async (id) => {
    return task_model_1.Task.findById(id);
};
exports.getTaskByIdRepo = getTaskByIdRepo;
const updateTaskRepo = async (id, data) => {
    return task_model_1.Task.findByIdAndUpdate(id, data, { new: true });
};
exports.updateTaskRepo = updateTaskRepo;
const deleteTaskRepo = async (id) => {
    await task_model_1.Task.findByIdAndDelete(id);
};
exports.deleteTaskRepo = deleteTaskRepo;
const getFilteredTasksRepo = async (filter, sort) => {
    return task_model_1.Task.find(filter).sort(sort);
};
exports.getFilteredTasksRepo = getFilteredTasksRepo;
//# sourceMappingURL=task.repository.js.map