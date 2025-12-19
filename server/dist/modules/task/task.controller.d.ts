import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
export declare const createTaskHandler: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateTaskHandler: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteTaskHandler: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getTasksHandler: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDashboardHandler: (req: AuthRequest, res: Response) => Promise<void>;
