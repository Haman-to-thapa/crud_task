"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const socket_1 = require("./socket");
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)();
socket_1.httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
