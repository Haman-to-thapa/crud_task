import "./setup";
import { TaskPriority } from "../modules/task/task.model";
import { User } from "../modules/auth/user.model";
import {
  createTask,
  updateTask,
  deleteTask
} from "../modules/task/task.service";

describe("Task Service", () => {
  let creatorId: string;
  let otherUserId: string;

  beforeEach(async () => {
    const creator = await User.create({
      name: "Creator",
      email: "creator@test.com",
      password: "hashed"
    });

    const other = await User.create({
      name: "Other",
      email: "other@test.com",
      password: "hashed"
    });

    creatorId = creator._id.toString();
    otherUserId = other._id.toString();
  });

  it("creates task with creatorId", async () => {
    const task = await createTask(
      {
        title: "Test",
        dueDate: new Date().toISOString(),
        priority: TaskPriority.HIGH,
        assignedToId: otherUserId
      },
      creatorId
    );

    expect(task.creatorId.toString()).toBe(creatorId);
  });

  it("blocks unauthorized update", async () => {
    const task = await createTask(
      {
        title: "Update Test",
        dueDate: new Date().toISOString(),
        priority: TaskPriority.MEDIUM,
        assignedToId: otherUserId
      },
      creatorId
    );

    await expect(
      updateTask(task._id.toString(), "randomId", {
        title: "Hack"
      })
    ).rejects.toThrow("Unauthorized");
  });

  it("blocks delete by non-creator", async () => {
    const task = await createTask(
      {
        title: "Delete Test",
        dueDate: new Date().toISOString(),
        priority: TaskPriority.LOW,
        assignedToId: otherUserId
      },
      creatorId
    );

    await expect(
      deleteTask(task._id.toString(), otherUserId)
    ).rejects.toThrow("Only creator can delete");
  });
});
