import { Request, Response } from "express";
import { registerSchema, loginSchema } from "./auth.dto";
import { registerUser, loginUser } from "./auth.service";
import { AuthRequest } from "../../types/auth-request"; 
import { User } from "./user.model";


export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(data.name, data.email, data.password);

  res.status(201).json({
    message: "User registered",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const { user, token } = await loginUser(data.email, data.password);

  res
  .cookie("token", token, {
    httpOnly: true,
    sameSite: "none",  
    secure: true,    
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  })
  .json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token 
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",  
    secure: true,
    path: "/"
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const me = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};