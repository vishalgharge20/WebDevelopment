import { useState } from "react";
import {v4 as uuid} from "uuid";


export default function EmojiClicker(){
const emojis = ["😀","😁","🙃","🤩","😙","🤑","🤫","😶","🥶","😭","😡"]
const [emoji,setEmoji] = useState([{id:'',emojipic:''}])

function addRandomEmoji(){
    const newemoji = emojis[Math.floor(Math.random()*emojis.length)]
    setEmoji(currentEmoji => [...currentEmoji, {id:uuid(),emojipic:newemoji} ])
}

function deleteEmoji(id){
// delete the emoji with the specified emoji
// previousEmoji.filter(item => item.id !== id) filters out the item with the given id.
setEmoji(previousEmoji => previousEmoji.filter(item =>item.id !== id) )
}


    return(
        <div>
            {/* Map should be used to itterate over the emojis and get emojipics */}
            <h1>Emoji: {emoji.map((item)=> (
                <span onClick={()=>deleteEmoji(item.id)}     // delete emoji --- use function or it will execute immediately                                                     
                key={item.id}> {item.emojipic} </span>))}
            </h1>
            <button onClick={addRandomEmoji}>Add Random Emoji</button>
        </div>
    )
}





// Notes
 
///
// The Correct Way: Spread Operator

// setEmoji(currentEmoji => [...currentEmoji, newemoji]);
// This creates a new array with the existing items (currentEmoji) and appends newemoji to it.
// React sees the new array reference and re-renders the component appropriately.

//If you use push inside setEmoji, you'd be mutating the current state instead of creating a new array. 
//This can lead to issues like:
// React not re-rendering the component.
// Debugging complexity due to unexpected side effects.