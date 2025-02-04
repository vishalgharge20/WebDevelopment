import "./Greeting.css"

function Greet(names){
    return(
        <div className="greet">
            <h2>Hello! To {names.person},</h2>
            <h3>- From {names.from}</h3>
        </div>
        
    )
}

export {Greet} 