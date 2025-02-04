
function ListPicker({names}){
    const random = Math.floor(Math.random()*names.length)
    return (
        <div>
            <p>The list of Names: {names} </p>
            <p>Random Name: {names[random]}</p>
        </div>
        
    )
}

export {ListPicker}