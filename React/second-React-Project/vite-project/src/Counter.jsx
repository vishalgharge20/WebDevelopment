import { useState } from "react";

export default function Counter(){
    const [count,setCount] = useState(0)

    function increaseCountOne(){
        setCount(count+1)
    }

    // function increaseCountThree(){
    //     setCount(count+3)
    // }

    function increaseCountThree(){
        setCount(currentCount => currentCount +1)
        setCount(currentCount => currentCount +1)
        setCount(currentCount => currentCount +1)
    }

    return(
        <div>
            <p>Count: {count}</p>
            <button onClick={increaseCountOne}>Increase Count: +1</button>
            <br />
            <br />
            <button onClick={increaseCountThree}>Increase Count: +3</button>
        </div>
    )
}