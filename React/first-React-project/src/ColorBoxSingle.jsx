import { useState } from "react";
import "./ColorBoxSingle.css"

export default function ColorBoxSingle(){
    const colors = ["Red","Green","Blue","Orange","Black","White"]
    const getRandomcolor = ()=> colors[Math.floor(Math.random()*colors.length)]
    const [color, setColor] = useState(getRandomcolor())

    function changeColor(){
        setColor(getRandomcolor())
    }

    return(
        <>
        <div className="ColorBoxSingle" onClick={changeColor} style={{ backgroundColor: color }}></div>
        </>
    )
}