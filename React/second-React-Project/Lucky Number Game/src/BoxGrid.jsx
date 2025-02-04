import { useState } from "react"
import Box from "./Box"
import "./BoxGrid.css"

export default function BoxGrid({n=12}){
const [boxColors,setBoxColor] = useState(Array(n).fill(true))

function toggleColor(index){
    setBoxColor(prevColors => prevColors.map((color, i) => (i === index ? !color : color))); // Toggle between true and false
}

function reset(){
    setBoxColor(Array(n).fill(true))
}
    return(
        <>
        <div className="BoxGrid">
        {boxColors.map((color, index) => (
        <Box
          key={index}
          onClick={() => toggleColor(index)} // Pass index to toggle specific box
          style={{ backgroundColor: color ? "red" : "transparent" }}
        />
      ))}
    </div>
      <button onClick={reset}>Reset !</button>
        </>
    )
}