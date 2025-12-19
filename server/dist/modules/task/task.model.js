"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskStatus = exports.TaskPriority = void 0;
const mongoose_1 = require("mongoose");
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "Low";
    TaskPriority["MEDIUM"] = "Medium";
    TaskPriority["HIGH"] = "High";
    TaskPriority["URGENT"] = "Urgent";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "To Do";
    TaskStatus["IN_PROGRESS"] = "In Progress";
    TaskStatus["REVIEW"] = "Review";
    TaskStatus["COMPLETED"] = "Completed";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: String,
    dueDate: { type: Date, required: true },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.TODO,
    },
    creatorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedToId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
//# sourceMappingURL=task.model.js.map