// src/components/TaskList.tsx
import { type FC } from "react";
import { useTasks, useDeleteTask } from "../hooks/useTasks";

const TaskList: FC = () => {
  const { data, isLoading, error } = useTasks();
  const deleteTask = useDeleteTask();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    // Handle error safely
    const errorMessage = (error as any)?.response?.data?.message ||
      (error as any)?.message ||
      "Please try again";

    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading tasks</p>
        <p className="text-gray-600 text-sm mt-2">
          {errorMessage}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-gray-500">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Tasks ({data.length})</h2>

      {data.map((task: any) => (  // Use 'any' temporarily to avoid type errors
        <div
          key={task._id}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${task.priority === "Urgent" ? "bg-red-100 text-red-800" :
                    task.priority === "High" ? "bg-orange-100 text-orange-800" :
                      task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                  }`}>
                  {task.priority}
                </span>
              </div>

              {task.description && (
                <p className="text-gray-600 mt-2">{task.description}</p>
              )}

              <div className="flex flex-wrap gap-3 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium">{task.status}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Due:</span>
                  <span className={`font-medium ${new Date(task.dueDate) < new Date() && task.status !== "Completed"
                      ? "text-red-600"
                      : "text-gray-700"
                    }`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Safely check for createdAt */}
                {task.createdAt && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-700">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
                  deleteTask.mutate(task._id);
                }
              }}
              className="ml-4 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400"
              disabled={deleteTask.isLoading}  // Changed from isPending to isLoading
              title="Delete task"
            >
              {deleteTask.isLoading ? "..." : "Delete"}  {/* Changed */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;