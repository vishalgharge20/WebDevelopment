import { useState } from "react"

export default function SignUpForm(){
    const [formData,setFormData] = useState({firstName:"",lastName:"",password:""})


    function handleChange(evt){
        const changedField = evt.target.name
        const newval = evt.target.value
        setFormData((currData) => {
            return {...currData, [changedField]: newval}
        })
    }

    function handleSubmit(){
        console.log(formData)
    }
    
    return(
        <>
        <div>
            <div>
            <label htmlFor="firstName">Enter a First Name: </label>
            <input type="text" name="firstName" id="firstname" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
            </div>
            <br />
            <div>
            <label htmlFor="lastName">Enter a Last Name: </label>
            <input type="text" name="lastName" id="lastname" placeholder="Last Name" value={formData.lastName} onChange ={handleChange}/>
            </div>
            <br />
            <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange ={handleChange}/>
            </div>
            <br />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}