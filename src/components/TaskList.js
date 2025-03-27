import { useState } from "react";  // ✅ Removed useEffect

const TaskList = ({ tasks, onComplete, onDelete, onUpdate }) => {
  const [editTask, setEditTask] = useState(null);
  const [actualTime, setActualTime] = useState({});

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleSaveEdit = () => {
    onUpdate(editTask._id, editTask);
    setEditTask(null);
  };

  const handleComplete = (taskId) => {
    const timeTaken = actualTime[taskId] || 0;
    onComplete(taskId, timeTaken);
  };

  return (
    <div className="mt-4">
      <h4 className="text-center text-primary">Your Tasks</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className={`list-group-item d-flex justify-content-between align-items-center ${task.status === "completed" ? "bg-success text-white" : "bg-light"}`}>
            <div className="flex-grow-1">
              {editTask && editTask._id === task._id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editTask.taskName}
                    onChange={(e) => setEditTask({ ...editTask, taskName: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editTask.description}
                    onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  ></textarea>
                  <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>
                    💾 Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditTask(null)}>
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <>
                  <h5 className={task.status === "completed" ? "text-decoration-line-through" : ""}>
                    {task.taskName}
                  </h5>
                  <p className="mb-1">{task.description}</p>
                  <small className="text-muted">Expected Time: {task.expectedTime} min</small>
                  <span className={`badge ${task.status === "completed" ? "bg-success" : "bg-warning"} ms-2`}>
                    {task.status.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <div className="d-flex flex-column">
              {task.status === "pending" && (
                <>
                  <input
                    type="number"
                    className="form-control form-control-sm mb-2"
                    placeholder="Actual Time (min)"
                    onChange={(e) => setActualTime({ ...actualTime, [task._id]: e.target.value })}
                  />
                  <button className="btn btn-success btn-sm mb-2" onClick={() => handleComplete(task._id)}>
                    ✅ Mark Complete
                  </button>
                </>
              )}
              {!editTask && (
                <>
                  <button className="btn btn-warning btn-sm mb-2" onClick={() => handleEdit(task)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(task._id)}>
                    ❌ Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
