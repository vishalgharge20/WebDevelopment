import { useState } from "react"


export default function Counter(){
    const [num, setNum] = useState(0)

    function incrementNum(){
        setNum(num+1)
    }

    return(
        <div>
            <p>The Count is: {num}</p>
            <button onClick={incrementNum}>Increament</button>
        </div>
    )
}