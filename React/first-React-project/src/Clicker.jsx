
function handleClick(){
    return(
        alert("Button Clicked")
    )
}

function hover(){
    return(
        console.log("Hovered!")
    )
}

export default function Clicker(){
    const buttonCLicked = 0;
    return(
        <div>
            <p onMouseOver={hover}>Hover over Me!!!</p>
            <button onClick={handleClick}>Click Me!!!</button>
        </div>
    )
}
