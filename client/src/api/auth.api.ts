import { api } from "../lib/axios";
import { type RegisterPayload,type LoginPayload,type AuthUser } from "../types/auth";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthUser> => {
  const res = await api.post("/auth/register", payload);
  return res.data.user;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const loginUser = async (payload: LoginPayload): Promise<AuthUser> => {
  const res = await api.post("/auth/login", payload);
  
 
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  
  return res.data.user;
};

export const getMe = async (): Promise<AuthUser> => {
  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
  const res = await api.get("/auth/me", config);
  return res.data.user;
};