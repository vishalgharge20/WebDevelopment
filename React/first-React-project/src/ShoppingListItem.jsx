export default function ShoppingListItem({item,quantity,completed}){
    
const style = {color: completed ? "grey":"red", 
            textDecoration: completed ? "line-through": "none"}
            
return(
    <li style={style}>
        {item} : {quantity}
    </li>
)
}



