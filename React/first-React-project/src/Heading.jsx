export default function Heading({color='orange',text,textSize='20px'}){
const styles = {color:color,fontSize:textSize}
return(
    <div className="Heading" style={styles}>
        <h1>{text}</h1>
    </div>
)
}