import "../styles/Ship.css";

function Ship({ name, health, status, isEnemy }) {
  const statusEmoji = health > 0 ? "🚀" : "💥";
  return (
    <>
      <div className="ship-name">{name}</div>
      <div className="ship-health">{health} </div>
      <div className={isEnemy ? "enemy-emoji ship-emoji" : "ship-emoji"}>
        {statusEmoji}
      </div>
    </>
  );
}

export default Ship;
