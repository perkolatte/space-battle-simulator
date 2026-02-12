import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import Ship from "./Ship.jsx";
import FiringControl from "./FiringControl.jsx";
import calcDamage from "../utils/calcDamage.js";
import GameState from "./GameState.jsx";
import AttackReadout from "./AttackReadout.jsx";
import { getRandomMessage } from "../utils/getRandomMessage.js";

function App() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [gameStatus, setGameStatus] = useState("playing");
  const [readoutMessages, setReadoutMessages] = useState([]);
  const [wasEnemyDominant, setWasEnemyDominant] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const lastMessageTypeRef = useRef("");
  const usedMessagesRef = useRef([]);

  const handleFire = () => {
    const [playerDamage, enemyDamage] = calcDamage(playerHealth, enemyHealth);

    const newPlayerHealth = Math.max(0, playerHealth - enemyDamage);
    const newEnemyHealth = Math.max(0, enemyHealth - playerDamage);

    setPlayerHealth(newPlayerHealth);
    setEnemyHealth(newEnemyHealth);

    // Check if tide has turned: was enemy dominant, now player dominant
    const nowPlayerDominant = newPlayerHealth > newEnemyHealth + 30;
    const tideChanged = wasEnemyDominant && nowPlayerDominant;
    const nowEnemyDominant = newEnemyHealth > newPlayerHealth + 30;
    setWasEnemyDominant(nowEnemyDominant);

    const playerMsg =
      playerDamage === 0 ? "Player: MISS" : `You deal ${playerDamage} damage`;
    const enemyMsg =
      enemyDamage === 0 ? "Enemy: MISS" : `Enemy deals ${enemyDamage} damage`;
    setReadoutMessages([...readoutMessages, playerMsg, enemyMsg]);

    if (newPlayerHealth === 0 && newEnemyHealth === 0) {
      setGameStatus("draw");
    } else if (newEnemyHealth === 0) {
      setGameStatus("win");
    } else if (newPlayerHealth === 0) {
      setGameStatus("loss");
    }
  };

  const handleRestart = () => {
    setPlayerHealth(100);
    setEnemyHealth(100);
    setGameStatus("playing");
    setReadoutMessages([]);
    setWasEnemyDominant(false);
    setCurrentMessage("");
    lastMessageTypeRef.current = "";
    usedMessagesRef.current = [];
  };

  const getMessageType = () => {
    const tideChanged = wasEnemyDominant && playerHealth > enemyHealth + 40;

    if (gameStatus === "win") {
      if (playerHealth <= 20) return "winBarely";
      if (playerHealth > 80) return "winClean";
      return "winNormal";
    }
    if (gameStatus === "loss") return "loss";
    if (gameStatus === "draw") return "draw";

    if (tideChanged) return "tideChanged";

    const bothLow = playerHealth <= 33 && enemyHealth <= 33;
    const bothMid =
      playerHealth > 33 &&
      playerHealth <= 66 &&
      enemyHealth > 33 &&
      enemyHealth <= 66;
    const bothScratched =
      playerHealth > 66 &&
      playerHealth <= 80 &&
      enemyHealth > 66 &&
      enemyHealth <= 80;
    const bothFull = playerHealth === 100 && enemyHealth === 100;
    const playerFullEnemyHigh =
      playerHealth === 100 && enemyHealth > 80 && enemyHealth < 100;
    const enemyFullPlayerHigh =
      enemyHealth === 100 && playerHealth > 80 && playerHealth < 100;
    const bothHigh =
      !bothFull &&
      !playerFullEnemyHigh &&
      !enemyFullPlayerHigh &&
      playerHealth > 80 &&
      enemyHealth > 80;
    const playerDominant = playerHealth > enemyHealth + 40;
    const enemyDominant = enemyHealth > playerHealth + 40;
    const playerAhead = playerHealth > enemyHealth;

    if (bothFull) return "bothFull";
    if (playerFullEnemyHigh) return "playerFullEnemyHigh";
    if (enemyFullPlayerHigh) return "enemyFullPlayerHigh";
    if (bothLow) return "bothLow";
    if (bothMid) return "bothMid";
    if (bothScratched) return "bothScratched";
    if (bothHigh) return "bothHigh";
    if (playerDominant) return "playerDominant";
    if (enemyDominant) return "enemyDominant";
    if (playerAhead) return "playerAhead";
    return "enemyAhead";
  };

  // Update message when message type changes
  useEffect(() => {
    const messageType = getMessageType();
    if (messageType !== lastMessageTypeRef.current) {
      lastMessageTypeRef.current = messageType;
      const newMessage = getRandomMessage(messageType, usedMessagesRef.current);
      setCurrentMessage(newMessage);
      usedMessagesRef.current = [...usedMessagesRef.current, newMessage];
    }
  }, [playerHealth, enemyHealth, gameStatus, wasEnemyDominant]);

  return (
    <>
      <h1>Space Battle Simulator</h1>
      <div className="battle-container">
        <div className="player-section">
          <Ship
            name="Player Ship"
            health={playerHealth}
            status={gameStatus}
            isEnemy={false}
          />
        </div>
        <div className="center-section">
          {gameStatus === "playing" ? (
            <FiringControl onFire={handleFire} />
          ) : (
            <button
              className="button-control restart-btn"
              onClick={handleRestart}
            >
              Restart?
            </button>
          )}
        </div>
        <div className="enemy-section">
          <Ship
            name="Enemy Ship"
            health={enemyHealth}
            status={gameStatus}
            isEnemy={true}
          />
        </div>
      </div>
      <AttackReadout messages={readoutMessages} />
      <div className="game-message">
        <GameState message={currentMessage} />
      </div>
    </>
  );
}

export default App;
