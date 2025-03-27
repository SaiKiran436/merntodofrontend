import { useEffect, useState } from "react";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  getUser,
  logout,
} from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  // ✅ Fix async function usage
  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleCompleteTask = async (taskId, actualTime) => {
    try {
      const updatedTask = await updateTask(taskId, {
        status: "completed",
        actualTime,
      });
      setTasks(
        tasks.map((task) => (task._id === taskId ? updatedTask.data : task))
      );
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = async () => {
    // await logout();
    navigate("/login");
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const newTask = await updateTask(taskId, updatedTask);
      setTasks(
        tasks.map((task) => (task._id === taskId ? newTask.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="dashboard-card shadow p-4">
        <h2 className="text-center mb-4">Welcome, User!</h2>
        <div className="text-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <TaskForm onAdd={handleAddTask} />
        <TaskList
          tasks={tasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
