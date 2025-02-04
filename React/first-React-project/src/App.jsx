import './App.css'
// import {Greet} from './Greeting'
// import Die from './Die'
// import { ListPicker } from './ListPicker'
// import DoubleDice from './DoubleDice'
import Heading from './Heading'
// import PropertyList from './PropertyList'
// import ShoppingList from './ShoppingList'
// import ColorList from './ColorList'
// import SoltMachine from './SlotMachine'
import Clicker from './Clicker'
import Form from './Form'
import Counter from './Counter'
import Toggler from './Toggler'
import ColorBox from './ColorBox'

// const data = [
//   {id:1, item: "Eggs",quantity:12, completed:false},
//   {id:2, item: "Milk",quantity:1, completed:true},
//   {id:3, item: "Chicken",quantity:4, completed:false},
//   {id:4, item: "Bananas",quantity:6, completed:false},
//   {id:5, item: "Carrots",quantity:2, completed:true}
// ]


// const properties = [
//   { id: 129031, name: "Desert Yurt", rating: 4.9, price: 150 },
//   { id: 129331, name: "Lone Mountain Cabin", rating: 4.8, price: 250 },
//   { id: 129032, name: "Cactus Retreat", rating: 4.75, price: 300 },
//   { id: 129033, name: "Redwood Treehouse Escape", rating: 4.9, price: 120 },
//   { id: 129034, name: "Oceanview Condo", rating: 4.7, price: 140 },
//   { id: 129035, name: "Gold Miner Campground", rating: 4.69, price: 96 },
// ];




function App() {

  return (
    <>
      {/* <Heading text="first React App" color='teal' textSize='10px'/> */}
      {/* <div>
      <Greet person="Sam" from="Vishal"/>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
      <Die sides={10}/>
      <Die/>
      <Die sides={45}/>
      </div>
      <ListPicker names={['sam, ','john, ','Roy, ','Ryan, ','Lee ']}/>
      <div>
        <DoubleDice/>
      </div>
      <div>
        <ColorList colors={["Red","Blue","Green","Pink","Orange","Black"]}/>
      </div>

      <div>
        <SoltMachine/>
      </div>


      <div>
        <ShoppingList items={data}/>
      </div>


      <PropertyList properties={properties}/>

      <div>
        <Clicker/>
      </div>
        <br />
      <div>
        <Form/>
      </div> */}

      {/* <div>
        <Counter/>
      </div>

      <Toggler/> */}

      <ColorBox/>
    
    </>
  )
}

export default App
