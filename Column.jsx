import TaskCard from "./TaskCard";

const columnIcons = {
  todo: "○",
  doing: "◐",
  done: "✓",
};

export default function Column({
  title,
  status,
  tasks,
  onMove,
  onDelete,
}) {
  return (
    <section className={`board-column ${status}`}>
      <div className="column-header">
        <div className="column-title">
          <span className="column-icon">{columnIcons[status]}</span>
          <h2>{title}</h2>
        </div>

        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="column-empty">
            <span>✓</span>
            <p>No tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}