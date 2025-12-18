// src/modules/task/task.model.ts
import { Schema, model, Types, Document } from "mongoose";

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent",
}

export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  REVIEW = "Review",
  COMPLETED = "Completed",
}

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: Types.ObjectId;
  assignedToId?: Types.ObjectId; // Optional in interface
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: String,
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedToId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // REMOVE 'required: true' or change to false
      required: false, // Make it optional
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);