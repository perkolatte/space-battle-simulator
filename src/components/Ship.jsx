import "../styles/Ship.css";

function Ship({ name, health, status, isEnemy }) {
  const statusEmoji = health > 0 ? "🚀" : "💥";
  return (
    <>
      <div className="ship-name">{name}</div>
      <div className="ship-health">{health} </div>
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
