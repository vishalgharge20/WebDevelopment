export default function DoubleDice(){
    let FirstDice = Math.floor(Math.random()*6)+1
    let SecondDice = Math.floor(Math.random()*6)+1
    const isWinner = FirstDice===SecondDice
    const result = isWinner ? "You Win!!!" : "Try Again :("
    const styles = {color:isWinner ? "Green" : "Red"}

    return(
        <div className="DoubleDice" style={styles}>
            <h2>{result}</h2>
            <p>First Dice: {FirstDice}</p>
            <p>Second Dice: {SecondDice}</p>
        </div>
    )

 
    // Or

    // if(FirstDice===SecondDice){
    //     return(
    //         <div>
    //             <h2>You Win</h2>
    //             <p>First Dice: {FirstDice}</p>
    //             <p>Second Dice: {SecondDice}</p>
    //         </div>
    
    //     )
    // }
    // else{
    //     return(
    //         <div>
    //         <h2>Try Again</h2>
    //         <p>First Dice: {FirstDice}</p>
    //         <p>Second Dice: {SecondDice}</p>
    //         </div>
    //     )

    // }
}