// COMMON PATTERNS FOR UPDATING ARRAYS IN STATE

// Initial shopping cart array
const shoppingCart = [
    { id: 1, product: "HDMI Cable", price: 4 },
    { id: 2, product: "Easy Bake Oven", price: 28 },
    { id: 3, product: "Peach Pie", price: 6.5 },
  ];
  

  // ------------------------------------------------------
  // ADDING TO AN ARRAY
  // Using the spread operator to add a new item to the array.
  // This returns a new array without modifying the original one.
  const updatedShoppingCartAdd = [...shoppingCart,{ id: 4, product: "Coffee Mug", price: 7.99 }];

  // Example: logging the updated cart after adding a new product
  console.log(updatedShoppingCartAdd);
  


  // ------------------------------------------------------
  // REMOVING AN ELEMENT
  // Using the filter() function to remove an item based on a condition.
  // This creates a new array without the item where id === 2.
  const updatedShoppingCartRemove = shoppingCart.filter((item) => item.id !== 2);

  // Example: logging the updated cart after removing a product
  console.log(updatedShoppingCartRemove);
  


  // ------------------------------------------------------
  // UPDATING ALL ELEMENTS IN AN ARRAY
  // Using the map() function to update all items in the array.
  // Here we are converting the product name to lowercase for every item.
  const updatedShoppingCartUpdateAll = shoppingCart.map((item) => {
    return {
      ...item, // Copy the original item
      product: item.product.toLowerCase(), // Update the product name
    };
  });

  // Example: logging the updated cart after modifying all product names
  console.log(updatedShoppingCartUpdateAll);
  


  // ------------------------------------------------------
  // MODIFYING A PARTICULAR ELEMENT IN AN ARRAY
  // Using map() again, but we only modify the item where id === 3.
  // If the condition is met, we update the price; otherwise, we return the item unchanged.
  const updatedShoppingCartModifyOne = shoppingCart.map((item) => {
    if (item.id === 3) {
      return { ...item, price: 10.99 }; // Update the price for item with id 3
    } else {
      return item; // Keep other items unchanged
    }
  });
  // Example: logging the updated cart after modifying the price of one product
  console.log(updatedShoppingCartModifyOne);
  

  
  // ------------------------------------------------------
  // IMPORTANT NOTES:
  // - All of the operations above create and return a new array. They do NOT modify the original `shoppingCart` array directly.
  // - In React, after modifying arrays or objects in state, you need to update the state using setState, for example:
  //   setShoppingCart(updatedShoppingCartAdd);
  //   setShoppingCart(updatedShoppingCartRemove);
  //   setShoppingCart(updatedShoppingCartUpdateAll);
  //   setShoppingCart(updatedShoppingCartModifyOne);
  