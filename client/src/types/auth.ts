export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Review"
  | "Completed";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
}



export type CreateTaskPayload = {
  title: string;
  dueDate: string;
  priority: TaskPriority;
  description?: string;
  status?: TaskStatus;
  //  assignedToId?: string;
};