"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const task_routes_1 = require("./modules/task/task.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://crud-task-1-mfom.onrender.com"
];
exports.app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/api/auth", auth_routes_1.authRoutes);
exports.app.use("/api/tasks", task_routes_1.taskRoutes);
exports.app.use(error_middleware_1.errorHandler);
