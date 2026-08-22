import { Link } from "react-router-dom";

const statusLabels = {
  todo: "To Do",
  doing: "Doing",
  done: "Done",
};

const priorityLabels = {
  low: "Low",
  normal: "Normal",
  high: "High",
};

export default function TaskCard({ task, onMove, onDelete }) {
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (confirmed) {
      onDelete(task.id);
    }
  };

  return (
    <article className={`task-card ${task.status}`}>
      <div className="task-card-top">
        <span className={`priority-badge ${task.priority}`}>
          {priorityLabels[task.priority]}
        </span>

        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          ×
        </button>
      </div>

      <h3>{task.title}</h3>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <div className="meta-item">
          <span>👤</span>
          <span>{task.assignee}</span>
        </div>

        <div className="meta-item">
          <span>📅</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="task-actions">
        <Link to={`/tasks/${task.id}`} className="card-action view-action">
          View
        </Link>

        <select
          value={task.status}
          onChange={(event) => onMove(task.id, event.target.value)}
          className="move-select"
          aria-label={`Move ${task.title}`}
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="task-status">
        <span className="status-dot" />
        {statusLabels[task.status]}
      </div>
    </article>
  );
}