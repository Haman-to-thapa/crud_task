import { type FC } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";

const Dashboard: FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <CreateTaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
