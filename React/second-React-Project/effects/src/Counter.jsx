import { useEffect, useState } from "react"

export default function Counter(){
    
    const [count,setCount] = useState(0)
    const [name,setName] = useState("")

    function addPoint(){
        setCount((currCount)=> currCount + 1)
    }

    function handleChange(evt){
        setName(evt.target.value)
    }

    function myEffect(){
        console.log("My Effected was Loaded")
    }
    // // run on every render
    // useEffect(myEffect)

    // //  only run use effects when name changes
    // useEffect(myEffect,[name])

    //  only run use effects on first render
    useEffect(myEffect,[])

    return(
        <div>
            <h2>Count: {count}</h2>
            <button onClick={addPoint}>CLick ME</button>
            <h2>Name: {name}</h2>
            <input type="text" name="name" onChange={handleChange} />
        </div>
    )
}