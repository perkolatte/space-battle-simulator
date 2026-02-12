import { useEffect, useRef } from "react";
import "../styles/GameState.css";

function GameState({ message }) {
  const ref = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // scroll the nearest .game-message container (the scrollable parent) to top
      const container = ref.current.closest
        ? ref.current.closest(".game-message")
        : ref.current.parentElement;
      if (container) container.scrollTop = 0;

      ref.current.classList.remove("fade-in");
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      ref.current.offsetHeight;
      ref.current.classList.add("fade-in");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (ref.current) ref.current.classList.remove("fade-in");
      }, 400);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [message]);

  return (
    <div
      className="game-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      ref={ref}
    >
      {message}
    </div>
  );
}

export default GameState;
