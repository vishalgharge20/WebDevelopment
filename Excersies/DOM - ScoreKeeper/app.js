
const playerOneBtn = document.querySelector('.playerOneBtn')
const playerTwoBtn = document.querySelector('.playerTwoBtn')
const resetBtn = document.querySelector('.resetBtn')

let playerOneScoreElement = document.querySelector('#span1')
let playerTwoScoreElement = document.querySelector('#span2')
let playingTo = document.querySelector('#numberOfGames')

let selectedGames = 1;
let isGameOver = false

function GameOver(){
    // disable all other buttons
    playerOneBtn.disabled = true
    playerTwoBtn.disabled = true
    //disable select
    playingTo.disabled = true
}


playingTo.addEventListener('change',function(){
    selectedGames = playingTo.value
    return selectedGames
})



playerOneBtn.addEventListener('click',function(){
    if(!isGameOver){
        let playerOneScore = parseInt(playerOneScoreElement.innerText) +1
        playerOneScoreElement.innerText = playerOneScore
        if(playerOneScore==selectedGames){
            playerOneScoreElement.style.color = 'green'
            playerTwoScoreElement.style.color = 'red'
            isGameOver = true
            GameOver()
        }
    }
})


playerTwoBtn.addEventListener('click',function(){
    if(!isGameOver){
        let playerTwoScore = parseInt(playerTwoScoreElement.innerText) +1
        playerTwoScoreElement.innerText = playerTwoScore
        if(playerTwoScore==selectedGames){
            playerOneScoreElement.style.color = 'red'
            playerTwoScoreElement.style.color = 'green'
            isGameOver = true
            GameOver()
        }
    }
})


resetBtn.addEventListener('click',function(){
    playerOneScoreElement.innerText = 0
    playerTwoScoreElement.innerText = 0
    playingTo.value = 1
    // enable all buttons
    playerOneBtn.disabled = false
    playerTwoBtn.disabled = false
    playingTo.disabled = false
    // set text color back to black
    playerOneScoreElement.style.color = 'rgb(33, 37, 41)'
    playerTwoScoreElement.style.color = 'rgb(33, 37, 41)'
})