import { Link } from "react-router-dom";

export default function EmptyState({
  title = "No tasks found",
  message = "There are no tasks to display.",
  showCreateButton = true,
}) {
  return (
    <div className="state-card">
      <div className="state-icon">✓</div>

      <h2>{title}</h2>

      <p>{message}</p>

      {showCreateButton && (
        <Link to="/tasks/new" className="button primary-button">
          Create Your First Task
        </Link>
      )}
    </div>
  );
}