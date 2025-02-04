import { useState } from "react"

export default function UserNameForm(){
    const [Username,setUserName] = useState("")

    function updateUserName(evt){
        setUserName(evt.target.value)
        // console.log(evt.target.value)
    }
    
    return(
        <>
        <div>
            <label htmlFor="username">Enter a UserName: </label>
            <input type="text" id="username" placeholder="Username" value={Username} onChange={updateUserName} />
            <br />
            <br />
            <button type="submit">Submit</button>
        </div>
        </>
    )
}