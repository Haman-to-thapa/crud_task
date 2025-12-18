import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";
import { type AuthUser } from "../types/auth";

export const useAuth = () => {
  return useQuery<AuthUser>({
    queryKey: ["auth-user"],
    queryFn: getMe,
    retry: false
  });
};
