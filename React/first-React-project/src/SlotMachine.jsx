export default function SoltMachine(){
    const FruitList = ["🍒","🍓","🥕"]
    const fruit1 = Math.floor(Math.random()*FruitList.length)
    const fruit2 = Math.floor(Math.random()*FruitList.length)
    const fruit3 = Math.floor(Math.random()*FruitList.length)

    const isWinner = fruit1===fruit2 && fruit2===fruit3 
    const result = isWinner ? "You Win!!!" : "Try Again :("
    const style = {color:isWinner ? "green" : "red"}
    const message = isWinner ? "Congrats!!!" : "Better Luck NextTime"

        return(
            <div>
                <h1>Slot Machine:</h1>
                <h1>{FruitList[fruit1]}, {FruitList[fruit2]}, {FruitList[fruit3]}</h1>
                <h2 style={style}>{result} <br /> {message} </h2>
            </div>
        )
    }
    


