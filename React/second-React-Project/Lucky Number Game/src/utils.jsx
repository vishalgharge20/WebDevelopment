// Rolls a single die
export function rollSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  // Rolls multiple dice and returns an array of results
  export function rollDiceArray(count) {
    return Array.from({ length: count }, () => rollSingleDie());
  }
  
  // Calculates the total sum of the dice
  export function calculateSum(diceResults) {
    return diceResults.reduce((total, value) => total + value, 0);
  }
  
  // Re-rolls the dice
  export function handleDiceRoll(numDice) {
    return rollDiceArray(numDice); // Returns new dice array
  }
  