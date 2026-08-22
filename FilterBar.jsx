export default function FilterBar({
  priority,
  assignee,
  onPriorityChange,
  onAssigneeChange,
  assignees,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="priority-filter">Priority</label>

        <select
          id="priority-filter"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="assignee-filter">Assignee</label>

        <select
          id="assignee-filter"
          value={assignee}
          onChange={(event) => onAssigneeChange(event.target.value)}
        >
          <option value="all">All members</option>

          {assignees.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}