import { useState } from "react";

function generateGameBoard(){
    console.log("Making the Initital GameBoard")
}

export default function Dumbo(){
    const [board,setBoard] = useState(generateGameBoard)
    return(
        <div>
            <button onClick={()=>{setBoard("Hello")}}>Click to Change State</button>
        </div>
    )
}