import { api } from "../lib/axios";
import { type RegisterPayload,type LoginPayload,type AuthUser } from "../types/auth";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthUser> => {
  const res = await api.post("/auth/register", payload);
  return res.data.user;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthUser> => {
  const res = await api.post("/auth/login", payload);
  return res.data.user;
};


export const getMe = async (): Promise<AuthUser> => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
