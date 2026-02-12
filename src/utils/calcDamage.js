function calcDamage(playerHealth, enemyHealth) {
  const baseMiss = 0.2;
  const additionalMax = 0.5;

  function missChanceFor(health) {
    const h = Math.min(Math.max(health, 0), 100);
    const additional = additionalMax * (1 - h / 100);
    return Math.min(baseMiss + additional, 0.95);
  }

  const playerMissChance = missChanceFor(playerHealth);
  const enemyMissChance = missChanceFor(enemyHealth);

  const roll = () => Math.floor(Math.random() * (40 - 10 + 1)) + 10;

  const playerDamage = Math.random() < playerMissChance ? 0 : roll();
  const enemyDamage = Math.random() < enemyMissChance ? 0 : roll();

  return [playerDamage, enemyDamage];
}

export default calcDamage;
