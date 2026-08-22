import { Link } from "react-router-dom";
import Board from "../components/Board";

export default function BoardPage() {
  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <span className="eyebrow">PROJECT WORKSPACE</span>

          <h2>Team Board</h2>

          <p>
            Organise, track and manage your team's work in one place.
          </p>
        </div>

        <Link to="/tasks/new" className="button primary-button">
          + New Task
        </Link>
      </section>

      <Board />
    </main>
  );
}