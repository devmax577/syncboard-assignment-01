export default function LoadingState() {
  return (
    <div className="state-card">
      <div className="loading-spinner" />
      <h2>Loading tasks...</h2>
      <p>Please wait while your board is being prepared.</p>
    </div>
  );
}