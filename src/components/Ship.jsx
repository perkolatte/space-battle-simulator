import { useEffect, useRef } from "react";
import "../styles/Ship.css";

function Ship({ name, health, status, isEnemy }) {
  const statusEmoji = health > 0 ? "🚀" : "💥";

  const clamped = Math.max(0, Math.min(100, Number(health) || 0));
  const hue = (clamped * 120) / 100; // 120 = green, 0 = red
  const color = `hsl(${hue}, 85%, 45%)`;

  const emojiRef = useRef(null);
  const prevHealthRef = useRef(health);

  // On initial mount, reveal ship with fade-in when it's alive
  useEffect(() => {
    if (emojiRef.current && health > 0) {
      const el = emojiRef.current;
      const container = el.parentElement;
      el.classList.remove("explode-fade", "shake", "fade-in");
      if (container) {
        container.classList.remove("exploding");
        container.classList.remove("fade-in");
      }
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      el.classList.add("fade-in");
      if (container) container.classList.add("fade-in");
    }
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prev = Number(prevHealthRef.current);
    const curr = Number(health);
    // If health decreased (but not respawn), trigger shake
    if (!Number.isNaN(prev) && curr < prev && curr > 0) {
      if (emojiRef.current) {
        emojiRef.current.classList.remove("shake");
        // force reflow to restart animation
        // eslint-disable-next-line no-unused-expressions
        emojiRef.current.offsetWidth;
        emojiRef.current.classList.add("shake");
      }
    }

    // If it just hit zero, play explosion fade
    if (prev > 0 && curr === 0) {
      if (emojiRef.current) {
        const el = emojiRef.current;
        const container = el.parentElement;
        // remove any transient hit shake before exploding
        el.classList.remove("shake");
        el.classList.remove("explode-fade");
        if (container) container.classList.remove("exploding");
        // eslint-disable-next-line no-unused-expressions
        el.offsetWidth;
        el.classList.add("explode-fade");
        if (container) container.classList.add("exploding");
      }
    }
    // If health was 0 and now positive, remove explode-fade and trigger fade-in
    if (prev === 0 && curr > 0) {
      if (emojiRef.current) {
        const el = emojiRef.current;
        const container = el.parentElement;
        el.classList.remove("explode-fade", "shake", "fade-in");
        if (container) {
          container.classList.remove("exploding");
          container.classList.remove("fade-in");
        }
        // force reflow to restart animation
        // eslint-disable-next-line no-unused-expressions
        el.offsetWidth;
        el.classList.add("fade-in");
        if (container) container.classList.add("fade-in");
      }
    }

    prevHealthRef.current = curr;
  }, [health]);

  return (
    <>
      <div className="ship-name">{name}</div>
      <div className="ship-health" style={{ color }}>
        {health}
      </div>
      {isEnemy ? (
        <div className="enemy-wrapper">
          <div className="enemy-emoji ship-emoji" aria-hidden="true">
            <span ref={emojiRef} className="ship-emoji-inner">
              <span className="ship-emoji-glyph">{statusEmoji}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="ship-emoji" aria-hidden="true">
          <span ref={emojiRef} className="ship-emoji-inner">
            <span className="ship-emoji-glyph">{statusEmoji}</span>
          </span>
        </div>
      )}
      <span className="sr-only">
        {health > 0 ? "Operational" : "Destroyed"}
      </span>
    </>
  );
}

export default Ship;
