
function handleFormSubmit(evt){
    evt.preventDefault();
    console.log("Form Submitted")
}

export default function Form(){
    return(
        <form onSubmit={handleFormSubmit}>
            <button type="submit">Submit</button>
        </form>
    )
}