import { type FC } from "react";
import { useTasks, useDeleteTask } from "../hooks/useTasks";

const TaskList: FC = () => {
  const { data, isLoading, error } = useTasks();
  const deleteTask = useDeleteTask();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load tasks</p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>

      <div className="grid gap-4">
        {data.map(task => (
          <div
            key={task._id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${task.priority === "Urgent" ? "bg-red-100 text-red-800" :
                      task.priority === "High" ? "bg-orange-100 text-orange-800" :
                        task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                    }`}>
                    {task.priority}
                  </span>
                </div>

                {task.description && (
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium">{task.status}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Due:</span>
                    <span className="font-medium">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Delete "${task.title}"?`)) {
                    deleteTask.mutate(task._id);
                  }
                }}
                disabled={deleteTask.isLoading}
                className="ml-4 text-red-600 hover:text-red-800 disabled:text-gray-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;