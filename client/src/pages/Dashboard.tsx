import { type FC } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const Dashboard: FC = () => {
  const { data: user, isLoading, refetch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      refetch();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          {user && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString()}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M9 16h2v-5h-2v5z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <CreateTaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;