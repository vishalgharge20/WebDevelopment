import './App.css'
import Counter from './Counter'
import Dumbo from './Dumbo'
import EmojiClicker from './EmojiClicker'
import ScoreKeeper from './ScoreKeeper'
import ScoreKeeperMultiplayer from './ScoreKeeperMultiplayer'

function App() {


  return (
    <>
    <h1>State Demo</h1>
    {/* <Counter/> */}
    {/* <br />
    <Dumbo/> 
    <ScoreKeeper/> 
    <EmojiClicker/> */}
    <ScoreKeeperMultiplayer numOfPlayers={5} target={10}/>
    </>
  )
}

export default App
