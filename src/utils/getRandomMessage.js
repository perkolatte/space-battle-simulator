import messages from "../data/messages/en.json";

export function getRandomMessage(messageType, usedMessages = []) {
  const pool = messages[messageType] || [];
  const available = pool.filter((msg) => !usedMessages.includes(msg));

  if (available.length === 0) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  return available[Math.floor(Math.random() * available.length)];
}

export default getRandomMessage;
