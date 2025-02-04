import PropertyListItem from "./PropertyListItem"
import "./PropertyList.css"



export default function PropertyList({properties}){
    const propertyList = properties.map((property)=> (
        <PropertyListItem key={property.id} {...property}/>
    ))
    return(
        <>
         <h2>Properties List:</h2>
         <div className="PropertyList">  
           {propertyList}
        </div>
        </>

    )
}