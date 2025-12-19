import { Server } from "socket.io";
import http from "http";
export declare const httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export declare const io: Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
