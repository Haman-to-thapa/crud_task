import { io } from "socket.io-client";

export const socket = io("https://crud-task-oh51.onrender.com", {
  withCredentials: true,
  transports: ["websocket"] 
});
