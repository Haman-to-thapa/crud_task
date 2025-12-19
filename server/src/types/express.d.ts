import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string; email: string };
    }
  }
}

export interface AuthRequest extends Request {
  cookies: {
    token?: string;
  };
  user?: {
    id: string;
    email: string;
  };
}