import "./Button.css"

export default function Button({clickFunc,btnTitle="Click Me!"}){
    return(
        <button className="Button" onClick={clickFunc}>{btnTitle}</button>
    )
}