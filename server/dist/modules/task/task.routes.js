"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const task_controller_1 = require("./task.controller");
const task_controller_2 = require("./task.controller");
exports.taskRoutes = (0, express_1.Router)();
exports.taskRoutes.use(auth_middleware_1.requireAuth);
exports.taskRoutes.post("/", task_controller_1.createTaskHandler);
exports.taskRoutes.get("/", task_controller_1.getTasksHandler);
exports.taskRoutes.patch("/:id", task_controller_1.updateTaskHandler);
exports.taskRoutes.delete("/:id", task_controller_1.deleteTaskHandler);
exports.taskRoutes.get("/dashboard", task_controller_2.getDashboardHandler);
//# sourceMappingURL=task.routes.js.map