import { useEffect, useRef } from "react";
import "../styles/AttackReadout.css";

function AttackReadout({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageClass = (message) => {
    if (message.includes("MISS")) {
      return "readout-message miss";
    } else if (message.includes("deal")) {
      return "readout-message hit";
    }
    return "readout-message";
  };

  const visible = messages.slice(-6);

  return (
    <div
      className="attack-readout"
      ref={scrollRef}
      role="log"
      aria-live="polite"
      aria-atomic="false"
    >
      {visible.map((msg, index) => {
        const age = visible.length - 1 - index; // 0 = newest
        const baseClass = getMessageClass(msg);
        const className = baseClass + (age >= 2 ? " old" : "");
        return (
          <div key={index} className={className}>
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default AttackReadout;
