import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request";

interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies?.token || 
                req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ 
      message: "Unauthorized - No token provided",
      details: "Please login first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    if (!decoded.userId) {
      return res.status(401).json({ 
        message: "Invalid token - Missing user ID" 
      });
    }
    
    req.userId = decoded.userId;
    console.log(`Authenticated user: ${decoded.userId}`);
    next();
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    
    // Provide more specific error messages
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token expired",
        details: "Please login again"
      });
    }
    
    return res.status(401).json({ 
      message: "Invalid token",
      details: error.message 
    });
  }
};