import "./Property.css"
export default function PropertyListItem({name,rating,price}){
return(
    <div className="Property">
        <h2>Property Name: {name}</h2>
        <h3>Ratings: {rating}</h3>
        <h3>Price: {price}</h3>
    </div>
)
}