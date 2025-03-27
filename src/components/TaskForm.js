import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState({ taskName: "", description: "", expectedTime: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(task);
    setTask({ taskName: "", description: "", expectedTime: "" }); // ✅ Reset form fields
  };

  return (
    <form className="task-form p-4 mt-4 border rounded shadow bg-white" onSubmit={handleSubmit}>  
      <h4 className="text-center text-primary">Add a New Task</h4>
      <div className="mb-3">
        <label className="form-label fw-bold">Task Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter task name"
          value={task.taskName} 
          onChange={(e) => setTask({ ...task, taskName: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Enter task description"
          value={task.description} 
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Expected Time (minutes)</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter expected time"
          value={task.expectedTime} 
          onChange={(e) => setTask({ ...task, expectedTime: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">➕ Add Task</button>
    </form>
  );
};

export default TaskForm;
