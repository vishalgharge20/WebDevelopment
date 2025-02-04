import { useState, useRef } from "react";

export default function ScoreKeeperMultiplayer({ numOfPlayers = 3, target = 5 }) {
  // create a new array (scores) having length equal to num of players and fill it with 0
  const [scores, setScores] = useState(new Array(numOfPlayers).fill(0));

  // Use useRef to track if the alert was shown for a player
  const alertShown = useRef(false);

  const resetGame = () => {
    alertShown.current = false; // Reset the alert flag
    setScores(new Array(numOfPlayers).fill(0)); // Reset the scores to 0
  };

  function increaseScore(idx) {
    setScores((previousScores) => {
      const updatedScores = previousScores.map((score, index) =>
        index === idx ? score + 1 : score
      );

      // Check if a player has won and the alert has not been shown yet
      if (updatedScores[idx] === target && !alertShown.current) {
        alertShown.current = true; // Set flag to true to prevent duplicate alerts
        alert(`Player ${idx + 1} Won`);

        // Reset all scores to 0 after a win with timeout
        setTimeout(resetGame, 3);
      }

      return updatedScores; // Return updated scores if no one wins
    });
  }


    return(
        <div>
            <ul>
                {scores.map((score,idx)=>{
                   return <li key={idx}>Player {idx+1}: {score} <button onClick={()=>increaseScore(idx)}>+1</button></li> 
                })}
            </ul>
        </div>
    )
}

