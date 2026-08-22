import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import { validateTask } from "../utils/validation";

const initialForm = {
  title: "",
  description: "",
  assignee: "",
  status: "todo",
  priority: "normal",
  dueDate: "",
};

const members = [
  "Member 1",
  "Member 2",
  "Member 3",
  "Member 4",
  "Member 5",
  "Member 6",
];

export default function TaskForm() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateTask(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      assignee: form.assignee,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate,
    };

    addTask(newTask);

    navigate("/");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">
          Task Title <span>*</span>
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Design dashboard"
        />

        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description <span>*</span>
        </label>

        <textarea
          id="description"
          name="description"
          rows="5"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what needs to be completed..."
        />

        {errors.description && (
          <p className="form-error">{errors.description}</p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="assignee">
            Assignee <span>*</span>
          </label>

          <select
            id="assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
          >
            <option value="">Select member</option>

            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>

          {errors.assignee && (
            <p className="form-error">{errors.assignee}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">
            Due Date <span>*</span>
          </label>

          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />

          {errors.dueDate && (
            <p className="form-error">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="button secondary-button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>

        <button type="submit" className="button primary-button">
          Create Task
        </button>
      </div>
    </form>
  );
}