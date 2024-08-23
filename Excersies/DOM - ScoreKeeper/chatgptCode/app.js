const playerOneBtn = document.querySelector('.playerOneBtn');
const playerTwoBtn = document.querySelector('.playerTwoBtn');
const resetBtn = document.querySelector('.resetBtn');

const playerOneScoreElement = document.querySelector('#span1');
const playerTwoScoreElement = document.querySelector('#span2');
const playingTo = document.querySelector('#numberOfGames');

let selectedGames = 1;

playingTo.addEventListener('change', function() {
    selectedGames = parseInt(playingTo.value);
});

playerOneBtn.addEventListener('click', function() {
    let playerOneScore = parseInt(playerOneScoreElement.innerText) + 1;
    playerOneScoreElement.innerText = playerOneScore;
    checkWin(playerOneScore, 'Player One');
});

playerTwoBtn.addEventListener('click', function() {
    let playerTwoScore = parseInt(playerTwoScoreElement.innerText) + 1;
    playerTwoScoreElement.innerText = playerTwoScore;
    checkWin(playerTwoScore, 'Player Two');
});

resetBtn.addEventListener('click', function() {
    playerOneScoreElement.innerText = 0;
    playerTwoScoreElement.innerText = 0;
    playingTo.value = 1;
    selectedGames = 1;
    enableButtons();
    resetTextColors();
});

function checkWin(score, player) {
    if (score == selectedGames) {
        playerOneScoreElement.style.color = player === 'Player One' ? 'green' : 'red';
        playerTwoScoreElement.style.color = player === 'Player Two' ? 'green' : 'red';
        disableButtons();
    }
}

function disableButtons() {
    playerOneBtn.disabled = true;
    playerTwoBtn.disabled = true;
    playingTo.disabled = true;
}

function enableButtons() {
    playerOneBtn.disabled = false;
    playerTwoBtn.disabled = false;
    playingTo.disabled = false;
}

function resetTextColors() {
    playerOneScoreElement.style.color = '#212529';
    playerTwoScoreElement.style.color = '#212529';
}
