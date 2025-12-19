import { Types, Document } from "mongoose";
export declare enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    URGENT = "Urgent"
}
export declare enum TaskStatus {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    REVIEW = "Review",
    COMPLETED = "Completed"
}
export interface ITask extends Document {
    title: string;
    description?: string;
    dueDate: Date;
    priority: TaskPriority;
    status: TaskStatus;
    creatorId: Types.ObjectId;
    assignedToId?: Types.ObjectId;
}
export declare const Task: import("mongoose").Model<ITask, {}, {}, {}, Document<unknown, {}, ITask, {}, import("mongoose").DefaultSchemaOptions> & ITask & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, ITask>;
