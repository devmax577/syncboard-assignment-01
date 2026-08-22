import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function NewTaskPage() {
  return (
    <main className="page-container narrow-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">TASK MANAGEMENT</span>

          <h2>Create New Task</h2>

          <p>
            Add a new task to your SyncBoard workspace.
          </p>
        </div>

        <Link to="/" className="button secondary-button">
          ← Back to Board
        </Link>
      </div>

      <section className="form-card">
        <TaskForm />
      </section>
    </main>
  );
}