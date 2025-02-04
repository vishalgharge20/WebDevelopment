// export default function ColorList({colors}){
//     const lis = colors.map((color)=> <li>{color}</li>)
//     return(
//         <div>
//             <h3>Colors List</h3>
//             <ul>{lis}</ul>
//         </div>
//     )
// }


// mapping can be done inside of the ul
export default function ColorList({colors}){
    return(
        <div>
            <h3>Colors List</h3>
            <ul>
                {colors.map((c)=>(
                <li style={{color:c}}>{c}</li>
                ))}
            </ul>
        </div>
    )
}


// // This functional component takes a `colors` prop and displays a list of colors.
// export default function ColorList({ colors }) {
//     // Map over the `colors` array to create a list of <li> elements for each color.
//     // The `map` method transforms each color string into a corresponding <li> element.
//     const lis = colors.map((color) => (
//       // Each color from the array is wrapped in an <li> tag.
//       // Ideally, each item in a list should have a unique key. 
//       <li key={color}>{color}</li>
//     ));
  
//     return (
//       <div>
//         {/* Display a heading for the list */}
//         <h3>Colors List</h3>
//         {/* Render the dynamically generated list of colors */}
//         <ul>{lis}</ul>
//       </div>
//     );
//   }
  