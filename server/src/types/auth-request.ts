import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
  body: any;
  params: any;
  query: any;
  cookies: {
    token?: string;
  };
}