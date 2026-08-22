export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card error-state">
      <div className="state-icon">!</div>

      <h2>Unable to load tasks</h2>

      <p>{message}</p>

      <button className="button primary-button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}