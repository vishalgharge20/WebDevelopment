import { useState } from "react"

export default function SignUpForm(){
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")


    function updateFirstName(evt){
        setFirstName(evt.target.value)
        // console.log(evt.target.value)
    }

    function updateLastName(evt){
        setLastName(evt.target.value)
        // console.log(evt.target.value)
    }

    function handleSubmit(){
        console.log(firstName, lastName)
    }
    
    return(
        <>
        <div>
            <div>
            <label htmlFor="firstname">Enter a First Name: </label>
            <input type="text" id="firstname" placeholder="First Name" value={firstName} onChange={updateFirstName}/>
            </div>
            <br />
            <div>
            <label htmlFor="lastname">Enter a Last Name: </label>
            <input type="text" id="lastname" placeholder="Last Name" value={lastName} onChange ={updateLastName}/>
            </div>
            <br />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}