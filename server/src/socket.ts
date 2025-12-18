import { Server } from "socket.io";
import http from "http";
import { app } from "./app";

export const httpServer = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://crud-task-1-mfom.onrender.com" 
];

export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(" Socket connected:", socket.id);

  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log(" Socket disconnected:", socket.id);
  });
});
