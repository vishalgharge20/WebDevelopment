import { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import {v4 as uuid} from "uuid"

export default function ShoppingList(){
    const [items,setItems] = useState([{id:uuid(),itemName:"Orange",qty:"4"},{id:uuid(),itemName:"Bananas",qty:"6"}])

    function addItem(item){
        setItems((currItems) => {
           return [...currItems, {...item,id:uuid()}]
        })
    }

    function delItem(id){
        setItems((currItems) => currItems.filter((item) => item.id !== id));
    }

    return(
        <>
        <div>
            <h1>Shopping List</h1>
            <ul>
                {items.map((item) =>
                <li onClick={()=>delItem(item.id)} key={item.id}>
                    {item.itemName} : {item.qty}
                </li>)}
            </ul>
            <ShoppingListForm addItemFunc={addItem}/>
        </div>
        </>
    )
}