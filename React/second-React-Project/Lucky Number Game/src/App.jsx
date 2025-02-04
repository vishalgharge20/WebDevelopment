import './App.css';
import BoxGrid from './BoxGrid';

// import LuckyN from './LuckyN';
// import { calculateSum } from './utils';

// // Define win check functions
// export function lessThan4(dice) {
//   return calculateSum(dice) < 4;
// }

// export function sumEquals6(dice) {
//   return calculateSum(dice) === 6;
// }

function App() {
  return (
    <>
      {/* <LuckyN winCheck={lessThan4}/> */}
      <BoxGrid/>
    </>
  );
}

export default App;