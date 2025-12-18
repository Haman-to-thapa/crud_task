 import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("https://crud-task-oh51.onrender.com", {
      transports: ["websocket"],
      withCredentials: true, 
      autoConnect: false     
    });
  }

  return socket;
};
