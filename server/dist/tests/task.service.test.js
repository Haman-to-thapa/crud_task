"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./setup");
const task_model_1 = require("../modules/task/task.model");
const user_model_1 = require("../modules/auth/user.model");
const task_service_1 = require("../modules/task/task.service");
describe("Task Service", () => {
    let creatorId;
    let otherUserId;
    beforeEach(async () => {
        const creator = await user_model_1.User.create({
            name: "Creator",
            email: "creator@test.com",
            password: "hashed"
        });
        const other = await user_model_1.User.create({
            name: "Other",
            email: "other@test.com",
            password: "hashed"
        });
        creatorId = creator._id.toString();
        otherUserId = other._id.toString();
    });
    it("creates task with creatorId", async () => {
        const task = await (0, task_service_1.createTask)({
            title: "Test",
            dueDate: new Date().toISOString(),
            priority: task_model_1.TaskPriority.HIGH,
            assignedToId: otherUserId
        }, creatorId);
        expect(task.creatorId.toString()).toBe(creatorId);
    });
    it("blocks unauthorized update", async () => {
        const task = await (0, task_service_1.createTask)({
            title: "Update Test",
            dueDate: new Date().toISOString(),
            priority: task_model_1.TaskPriority.MEDIUM,
            assignedToId: otherUserId
        }, creatorId);
        await expect((0, task_service_1.updateTask)(task._id.toString(), "randomId", {
            title: "Hack"
        })).rejects.toThrow("Unauthorized");
    });
    it("blocks delete by non-creator", async () => {
        const task = await (0, task_service_1.createTask)({
            title: "Delete Test",
            dueDate: new Date().toISOString(),
            priority: task_model_1.TaskPriority.LOW,
            assignedToId: otherUserId
        }, creatorId);
        await expect((0, task_service_1.deleteTask)(task._id.toString(), otherUserId)).rejects.toThrow("Only creator can delete");
    });
});
