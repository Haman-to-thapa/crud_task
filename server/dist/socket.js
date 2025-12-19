"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.httpServer = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.httpServer = http_1.default.createServer(app_1.app);
const allowedOrigins = [
    "http://localhost:5173",
    "https://crud-task-1-mfom.onrender.com"
];
exports.io = new socket_io_1.Server(exports.httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST"]
    }
});
exports.io.on("connection", (socket) => {
    console.log(" Socket connected:", socket.id);
    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`👤 User joined room: ${userId}`);
    });
    socket.on("disconnect", () => {
        console.log(" Socket disconnected:", socket.id);
    });
});
