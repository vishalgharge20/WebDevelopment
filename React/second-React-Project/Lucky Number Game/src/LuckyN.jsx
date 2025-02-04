import { useState } from "react";
import Dice from "./Dice";
import { handleDiceRoll, rollDiceArray, rollSingleDie, calculateSum } from "./utils";
import { sumEquals6 } from "./App";  // Correctly importing sumEquals6 from App.js
import Button from "./Button";

export default function LuckyGame({ numDice = 2, winCheck = sumEquals6 }) {  // Default to sumEquals6 if not provided
  const [diceResults, setDiceResults] = useState(rollDiceArray(numDice));

  // Determine if the current roll is a win based on the winCheck function
  const isWinner = winCheck(diceResults);

  // Handle dice roll (with number of dice as an argument)
  const rollDice = () => {
    setDiceResults(handleDiceRoll(numDice)); // Re-roll the dice
  };

  const endGame = ()=>{
    alert("Game Ended")
    window.close();
  }

  return (
    <div>
      <h1>Lucky Number Game</h1>
      <h2 style={{ color: isWinner ? "green" : "inherit" }}>
        {isWinner ? "YOU WON!" : "Roll Again!"}
      </h2>
      <Dice dice={diceResults} />
      <br />
      <Button clickFunc={rollDice} btnTitle="Roll Dice !"/>
      {/* <Button clickFunc={endGame} btnTitle="Reset"/> */}
    </div>
  );
}
