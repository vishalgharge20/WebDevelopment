import { useForm } from "react-hook-form";

export default function ShoppingListForm({ addItemFunc }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Handle form submission
    function onSubmit(data) {
        addItemFunc(data); // Pass the form data to addItemFunc
        reset(); // Reset the form after submission
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="ShoppingListForm">
                    <h2>Add More Items</h2>

                    {/* React Hook Form will automatically handle validation */}
                    <div>
                        <label htmlFor="itemname">Item Name: </label>
                        <input
                            type="text"
                            placeholder="Item Name"
                            name="itemName"
                            id="itemName"
                            {...register("itemName", { required: "Item name cannot be empty!!!" })} // React Hook Form validation
                        />
                        {/* Display error message for itemName */}
                        {errors.itemName && (
                            <p style={{ color: "red" }}>{errors.itemName.message}</p>
                        )}
                    </div>
                    <br />
                    <div>
                        <label htmlFor="qty">Quantity: </label>
                        <input
                            type="text"
                            placeholder="Quantity"
                            name="qty"
                            id="qty"
                            {...register("qty", { required: "Qty cannot be empty! \n Please Add Some Qty" })} // Optional validation for qty
                        />
                        {/* Display error message for itemName */}
                        {errors.qty && (
                            <p style={{ color: "red" }}>{errors.qty.message}</p>
                        )}
                    </div>
                    <br />
                    <button type="submit">Add Item !</button>
                </div>
            </form>
        </>
    );
}
