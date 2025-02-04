import "./Box.css"

export default function Box({onClick,style}){

    return(
        <>
        <div className="Box" onClick={onClick} style={style}>
        </div>
        </>
    )
}