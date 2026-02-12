import "../styles/Ship.css";

function Ship({ name, health, status, isEnemy }) {
  const statusEmoji = health > 0 ? "🚀" : "💥";

  const clamped = Math.max(0, Math.min(100, Number(health) || 0));
  const hue = (clamped * 120) / 100; // 120 = green, 0 = red
  const color = `hsl(${hue}, 85%, 45%)`;

  return (
    <>
      <div className="ship-name">{name}</div>
      <div className="ship-health" style={{ color }}>{health}</div>
      <div
        className={isEnemy ? "enemy-emoji ship-emoji" : "ship-emoji"}
        aria-hidden="true"
      >
        {statusEmoji}
      </div>
      <span className="sr-only">
        {health > 0 ? "Operational" : "Destroyed"}
      </span>
    </>
  );
}

export default Ship;
