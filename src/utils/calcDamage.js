function calcDamage(playerHealth, enemyHealth) {
  // Base miss chance when a ship is undamaged (50%)
  const baseMiss = 0.5;
  // Maximum amount the miss chance can be reduced as a ship gets damaged.
  // At 0 HP this will reduce miss by `additionalMax` (making hits much more likely).
  const additionalMax = 0.1;

  // miss chance should depend on both the shooter's health and the target's health.
  // - A damaged target is easier to hit (reduces miss).
  // - A damaged shooter is worse at aiming (increases miss).
  const shooterPenaltyMax = 0.05; // how much miss increases when shooter is at 0 HP

  function missChanceFor(shooterHealth, targetHealth) {
    const s = Math.min(Math.max(shooterHealth, 0), 100);
    const t = Math.min(Math.max(targetHealth, 0), 100);

    // Target adjustment: more damaged targets reduce miss (easier to hit)
    const targetAdjustment = additionalMax * (1 - t / 100);

    // Shooter penalty: more damaged shooters increase miss (worse aim)
    const shooterPenalty = shooterPenaltyMax * (1 - s / 100);

    // Base miss minus target benefit plus shooter penalty
    const miss = baseMiss - targetAdjustment + shooterPenalty;

    // Clamp between sensible bounds
    return Math.min(Math.max(miss, 0.05), 0.95);
  }

  const playerMissChance = missChanceFor(playerHealth, enemyHealth);
  const enemyMissChance = missChanceFor(enemyHealth, playerHealth);

  const roll = () => Math.floor(Math.random() * (40 - 10 + 1)) + 10;

  const playerDamage = Math.random() < playerMissChance ? 0 : roll();
  const enemyDamage = Math.random() < enemyMissChance ? 0 : roll();

  return [playerDamage, enemyDamage];
}

export default calcDamage;
