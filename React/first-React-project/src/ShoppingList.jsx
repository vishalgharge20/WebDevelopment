import ShoppingListItem from "./ShoppingListItem"

export default function ShoppingList({items}){
const itemList = items.map(i=> (
    <ShoppingListItem key={i.id} 
                        item={i.item} 
                        quantity={i.quantity} 
                        completed={i.completed}/>
))
return(
    <div>
        <h2>Shopping List:</h2>
        <ul>{itemList}</ul>
    </div>
)
}



