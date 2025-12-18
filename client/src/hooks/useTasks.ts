// src/hooks/useTasks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks, getDashboardTasks, createTask, deleteTask } from "../api/task.api";

export const useTasks = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    retry: 1,
    staleTime: 1000 * 60, // 1 minute
  });

export const useDashboardTasks = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardTasks,
    retry: 1,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: any) => {
      console.error("Create task error:", error);
    }
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: any) => {
      console.error("Delete task error:", error);
    }
  });
};