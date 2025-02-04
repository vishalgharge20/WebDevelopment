import { useState } from "react";

export default function Toggler(){
    const [face,setFace] = useState("🙂")
    const [mood,setMood] = useState("Happy Mood")
    

    function ToggleFace(){
        if(face==="😞"){
            setFace("🙂")
            setMood("Happy Mood")
            
        }
        if(face==="🙂"){
            setFace("😞")
            setMood("Sad Mood")
        }
    }

    return(
        <div>
            <h1>{face}</h1>
            <div>
            {mood === "Happy Mood" ? 
            (<h3 style={{ color: "Green" }}>{mood}</h3>):
            (<h3 style={{ color: "Red" }}>{mood}</h3>)
            }
            </div>
            <h2>Click This Button To Toggle Your Mood!!!</h2>
            <button onClick={ToggleFace}>Switch Mood!!!</button>
        </div>
    )
}
