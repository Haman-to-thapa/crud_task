import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
export declare const register: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<void>;
export declare const logout: (req: Request, res: Response) => void;
export declare const me: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
