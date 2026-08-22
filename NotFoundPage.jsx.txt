import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page-container">
      <div className="state-card">
        <div className="not-found-number">404</div>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="button primary-button">
          Return to Board
        </Link>
      </div>
    </main>
  );
}