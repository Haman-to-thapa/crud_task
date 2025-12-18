import { Router } from "express";
import { register, login, me } from "./auth.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import { logout } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", requireAuth, me);