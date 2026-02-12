import "../styles/FiringControl.css";

function FiringControl({ onFire }) {
  return (
    <button className="button-control firing-control" onClick={onFire}>
      Fire
    </button>
  );
}

export default FiringControl;
