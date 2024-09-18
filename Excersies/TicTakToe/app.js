const player_X_class = 'X'
const player_O_class = 'O'

const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let cells = document.querySelectorAll('.cell')



let currentSymbol = 'X';

function toggleSymbol(box){
    if(box.textContent === ''){
        box.textContent = currentSymbol;
        currentSymbol = currentSymbol === 'X' ? 'O': 'X';
    }
}


function checkWinningCombination(){
    for(combination of winningCombination){
        for(i of combination){
            if(i.innerText === 'X')
                continue
            else{
                break
            }
        }
        console.log(i.innerText)

    }
}