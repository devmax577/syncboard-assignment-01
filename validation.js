export function validateTask(task) {
  const errors = {};

  if (!task.title || !task.title.trim()) {
    errors.title = "Task title is required.";
  } else if (task.title.trim().length < 3) {
    errors.title = "Task title must be at least 3 characters.";
  }

  if (!task.description || !task.description.trim()) {
    errors.description = "Task description is required.";
  }

  if (!task.assignee || !task.assignee.trim()) {
    errors.assignee = "Please select an assignee.";
  }

  if (!task.status) {
    errors.status = "Please select a status.";
  }

  if (!task.priority) {
    errors.priority = "Please select a priority.";
  }

  if (!task.dueDate) {
    errors.dueDate = "Due date is required.";
  }

  return errors;
}