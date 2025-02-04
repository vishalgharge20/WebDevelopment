import { useState } from "react";

export default function ShoppingListForm({addItemFunc}){
    const [formData,SetFormData] =useState({itemName:"",qty:""})
    const [productIsValid,setProductIsValid] = useState(false)

    function validate(itemName){
        if(itemName.length === 0){
            setProductIsValid(false)
        }else{
            setProductIsValid(true)
        }
    }

    function handleChange(evt){
        if(evt.target.name=== "itemName"){
            validate(evt.target.value)
        }
        const changedField = evt.target.name
        const newVal = evt.target.value
        SetFormData((currData)=>{
           return {...currData, [changedField]:newVal}
        })
    }

    function handleSubmit(evt){
        evt.preventDefault()
        if(productIsValid){
            addItemFunc(formData)
            SetFormData({ itemName: "", qty: "" }); // Set fields to null after submit
        }
        
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
        <div className="ShoppingListForm">
            <h2>Add More Items</h2>
            {!productIsValid && (<p style={{ color: "red" }}>Item name cannot be empty</p>)}
            <div>
                <label htmlFor="itemname">Item Name: </label>
                <input type="text" placeholder="Item Name" name="itemName" id="itemName" value={formData.itemName} onChange={handleChange}/>
            </div>
            <br />
            <div>
                <label htmlFor="qty">Quantity: </label>
                <input type="text" placeholder="Quantity" name="qty" id="qty" value={formData.qty} onChange={handleChange}/>
            </div>
            <br />
            <button type="submit" disabled={!productIsValid} >Add Item !</button>
        </div>
        </form>
        </>
    )
}