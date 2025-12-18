export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "To Do" | "In Progress" | "Review" | "Completed";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: string;
  assignedToId?: string;
  createdAt?: string;  
  updatedAt?: string;  
  __v?: number;      
}