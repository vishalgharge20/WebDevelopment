import { useState } from "react"

// export default function ScoreKeeper(){
//     const [score1, setScore1] = useState(0)
//     const [score2, setScore2] = useState(0)

//     function increasePlayer1Score(){
//         setScore1(currentScore1=> currentScore1 +1)
//     }

//     function increasePlayer2Score(){
//         setScore2(currentScore2=> currentScore2 +1)
//     }

//     return(
//         <div>
//             <h2>Player 1: {score1} </h2>
//             <h2>Player 2:  {score2}</h2>
//             <button onClick={increasePlayer1Score}>+1 Player 1</button>
//             <br />
//             <br />
//             <button onClick={increasePlayer2Score}>+1 Player 2</button>
//         </div>
//     )
// }


// or

export default function ScoreKeeper(){
    const [score, setScore] = useState({p1Score:0,p2Score:0})


    function increaseP1Score(){
        // setScore( oldScores => oldScores + 1 )   Same logic is used
        setScore((oldScores) => ({...oldScores, p1Score: oldScores.p1Score +1 }))
    }
// or this below method can also be used
    function increaseP2Score(){
        const newScore = {...score, p2Score: score.p2Score+1}
        setScore(newScore)
    }
    return(
        <div>
            <h2>Player 1: {score.p1Score} </h2>
            <h2>Player 2:  {score.p2Score}</h2>
            <button onClick={increaseP1Score}>+1 Player 1</button>
            <br />
            <br />
            <button onClick={increaseP2Score}>+1 Player 2</button>
        </div>
    )
}