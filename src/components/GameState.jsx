import "../styles/GameState.css";

function GameState({ message }) {
  return (
    <div
      className="game-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

export default GameState;
