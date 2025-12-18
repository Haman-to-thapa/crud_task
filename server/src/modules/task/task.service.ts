import {
  createTaskRepo,
  getTasksRepo,
  getTaskByIdRepo,
  updateTaskRepo,
  deleteTaskRepo,
  getFilteredTasksRepo
} from "./task.repository";
import { ITask, TaskStatus } from "./task.model";
import { io } from "../../socket";
import { Types } from "mongoose";
export const createTask = async (
  data: any,
  creatorId: string
) => {
  const taskData: Partial<ITask> = {
    title: data.title,
    description: data.description || "",
    dueDate: data.dueDate instanceof Date ? data.dueDate : new Date(data.dueDate),
    priority: data.priority,
    status: data.status || TaskStatus.TODO,
    creatorId: new Types.ObjectId(creatorId),
    assignedToId: new Types.ObjectId(creatorId) 
  };

  if (data.assignedToId && Types.ObjectId.isValid(data.assignedToId)) {
    taskData.assignedToId = new Types.ObjectId(data.assignedToId);
  }

  console.log("Creating task with data:", taskData);
  return createTaskRepo(taskData);
};
export const getTasksForUser = async (userId: string) => {
  return getTasksRepo({
    $or: [{ creatorId: userId }, { assignedToId: userId }]
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await getTaskByIdRepo(taskId);
  if (!task) throw new Error("Task not found");

  if (task.creatorId.toString() !== userId) {
    throw new Error("Only creator can delete");
  }

  await deleteTaskRepo(taskId);
};

export const getTasksWithFilters = async (
  userId: string,
  filters: any
) => {
  const query: any = {
    $or: [{ creatorId: userId }, { assignedToId: userId }]
  };

  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;

  const sort: Record<string, 1 | -1> =
    filters.sort === "dueDate" ? { dueDate: 1 } : {};

  return getFilteredTasksRepo(query, sort);
};

export const getDashboardTasks = async (userId: string) => {
  const now = new Date();

  const assigned = await getFilteredTasksRepo(
    { assignedToId: userId },
    {}
  );

  const created = await getFilteredTasksRepo(
    { creatorId: userId },
    {}
  );

  const overdue = await getFilteredTasksRepo(
    {
      assignedToId: userId,
      dueDate: { $lt: now },
      status: { $ne: TaskStatus.COMPLETED }
    },
    {}
  );

  return { assigned, created, overdue };
};

export const updateTask = async (
  taskId: string,
  userId: string,
  data: any
) => {
  const task = await getTaskByIdRepo(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const isCreator = task.creatorId.toString() === userId;
  const isAssignee = task.assignedToId?.toString() === userId;

  if (!isCreator && !isAssignee) {
    throw new Error("Unauthorized");
  }

  const updatedTask = await updateTaskRepo(taskId, data);

  io.emit("task:updated", updatedTask);
  if (
    data.assignedToId &&
    task.assignedToId &&
    data.assignedToId !== task.assignedToId.toString()
  ) {
    io.to(data.assignedToId).emit("task:assigned", updatedTask);
  }

  return updatedTask;
};

