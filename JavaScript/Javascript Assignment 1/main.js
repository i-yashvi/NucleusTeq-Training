let currentPlayer = 1;
let player1SavedScore = 0;
let player2SavedScore = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let currentScore = 0;
let isGameOver = false;

const player1NameInput = document.getElementById('player1-name');
const p1Scores = document.getElementById('p1-score-container');
const player1Display = document.getElementById('player1-saveScore');
const p1CurrentScoreDisplay = document.getElementById('player1-currentScore');
const savePlayer1Button = document.getElementById('save-player1');

const rollDiceButton = document.getElementById('roll-player');
const startGameButton = document.getElementById('start-game');
const diceRollBox = document.getElementById('dice-roll-box');
const diceContainer = document.querySelector('.dice');
const resetGameButton = document.getElementById('reset-game');

const player2NameInput = document.getElementById('player2-name');
const p2Scores = document.getElementById('p2-score-container');
const player2Display = document.getElementById('player2-saveScore');
const p2CurrentScoreDisplay = document.getElementById('player2-currentScore');
const savePlayer2Button = document.getElementById('save-player2');
const winnerOverlay = document.getElementById('winner-overlay');
const winnerMessage = document.getElementById('winner-message');
const newGameButton = document.getElementById('new-game');

player1NameInput.classList.remove('hidden');
player2NameInput.classList.remove('hidden');

function showWinner(playerName, player) {
    startGameButton.classList.add('hidden');
    diceRollBox.classList.add('hidden');
    resetGameButton.classList.add('hidden');
    rollDiceButton.classList.add('hidden');
    if(player === 1){
        savePlayer1Button.disabled = true;
        savePlayer1Button.classList.add('disabled'); 
        savePlayer1Button.classList.remove('active');
    }
    else{
        savePlayer2Button.disabled = true;
        savePlayer2Button.classList.add('disabled'); 
        savePlayer2Button.classList.remove('active');
    }
    winnerMessage.textContent = `${playerName} wins!`;
    winnerOverlay.classList.remove('hidden');
}

newGameButton.addEventListener('click', () => {
    window.location.reload();
});

function startGame() {

    const player1Name = player1NameInput.value.trim() === "" ? "Player 1" : player1NameInput.value.trim();
    const player2Name = player2NameInput.value.trim() === "" ? "Player 2" : player2NameInput.value.trim();
    
    //set players name in UI
    document.getElementById('player1-box').querySelector('h2').textContent = `${player1Name}`;
    document.getElementById('player2-box').querySelector('h2').textContent = `${player2Name}`;
    
    player1SavedScore = 0;
    player2SavedScore = 0;
    player1CurrentScore = 0;
    player2CurrentScore = 0;

    player1Display.textContent = player1SavedScore;  
    player2Display.textContent = player2SavedScore;  
    p1CurrentScoreDisplay.textContent = player1CurrentScore;  
    p2CurrentScoreDisplay.textContent = player2CurrentScore;

    //hide start game button and show dice area
    diceContainer.classList.remove("roll-animation");
    startGameButton.classList.add('hidden');
    diceRollBox.classList.remove('hidden');
    resetGameButton.classList.remove('hidden');
    player1NameInput.classList.add('hidden');
    player2NameInput.classList.add('hidden');
    rollDiceButton.classList.remove('hidden');
    savePlayer1Button.classList.remove('hidden');
    savePlayer2Button.classList.remove('hidden');
    resetGameButton.classList.remove('hidden');
    p1Scores.style.display = "flex";
    p2Scores.style.display = "flex";
    
    //enable roll dice and save score buttons
    rollDiceButton.disabled = false; //starts with player1
    savePlayer1Button.disabled = true;
    savePlayer2Button.disabled = true;

    const interval = setInterval(() => {
       randomizeDice(diceContainer);
    }, 30);

    setTimeout(() => {
        clearInterval(interval);
    }, 500);

    updateColors();
}

function randomizeDice(diceContainer){
    diceContainer.innerHTML = "";

    const random = Math.floor((Math.random()*6) + 1);
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    };

    for (const dotPosition of dotPositionMatrix[random]) {
        const dot = document.createElement("div");
        dot.classList.add("dice-dot");
        dot.style.setProperty("--top", dotPosition[0] + "%");
        dot.style.setProperty("--left", dotPosition[1] + "%");
        diceContainer.appendChild(dot);
    }

    return random;
}

function updateColors() {
    
    if(currentPlayer === 1) {
        savePlayer1Button.classList.add('disabled'); 
        savePlayer1Button.classList.remove('active');
        savePlayer2Button.classList.add('disabled'); 
        savePlayer2Button.classList.remove('active');
        document.getElementById('player1-box').classList.add('active');
        document.getElementById('player2-box').classList.remove('active');
    }
    else{
        savePlayer2Button.classList.add('disabled'); 
        savePlayer2Button.classList.remove('active');
        savePlayer1Button.classList.add('disabled'); 
        savePlayer1Button.classList.remove('active');
        document.getElementById('player2-box').classList.add('active');
        document.getElementById('player1-box').classList.remove('active');
    }
}

function rollDice(player) {
    if (isGameOver) return;

    let diceValue = 0;

    diceContainer.classList.remove("roll-animation");
    void diceContainer.offsetWidth; 
    diceContainer.classList.add("roll-animation");

    const diceSound = new Audio('Dice-roll.mp3');
    diceSound.play();

    diceValue = randomizeDice(diceContainer);

    setTimeout(() => {

        diceValue = randomizeDice(diceContainer);

        if(player === 1){
            savePlayer1Button.disabled = false;
            savePlayer1Button.classList.add('active');
            savePlayer1Button.classList.remove('disabled');
            if(diceValue === 1){
                player1CurrentScore = 0;
                currentPlayer = 2;
                p1CurrentScoreDisplay.textContent = player1CurrentScore;
                updateColors();
            }
            else {
                player1CurrentScore += diceValue;
                p1CurrentScoreDisplay.textContent = player1CurrentScore;
                if (player1CurrentScore + player1SavedScore >= 10) {
                    player1SavedScore += player1CurrentScore;
                    player1Display.textContent = player1SavedScore;
                    setTimeout(() => {
                        showWinner(player1NameInput.value || 'Player 1', currentPlayer);
                    }, 500);
                }
            }
        }
        else{
            savePlayer2Button.disabled = false;
            savePlayer2Button.classList.add('active');
            savePlayer2Button.classList.remove('disabled');
            if(diceValue === 1){
                player2CurrentScore = 0;
                currentPlayer = 1;
                p2CurrentScoreDisplay.textContent = player2CurrentScore;
                updateColors();
            }
            else {
                player2CurrentScore += diceValue;
                p2CurrentScoreDisplay.textContent = player2CurrentScore;
                if (player2CurrentScore + player2SavedScore >= 10) {
                    player2SavedScore += player2CurrentScore;
                    player2Display.textContent = player2SavedScore;
                    setTimeout(() => {
                        showWinner(player2NameInput.value || 'Player 2', currentPlayer);
                    }, 500);
                }
            }
        }
    }, 1000);
} 

function saveScore(player) {
    if (isGameOver) return;

    if(player === 1) {
        player1SavedScore += player1CurrentScore;
        player1CurrentScore = 0;
        currentPlayer = 2;
        player1Display.textContent = player1SavedScore;
        p1CurrentScoreDisplay.textContent = player1CurrentScore;
    }
    else {
        player2SavedScore += player2CurrentScore;
        player2CurrentScore = 0;
        currentPlayer = 1;
        player2Display.textContent = player2SavedScore;
        p2CurrentScoreDisplay.textContent = player2CurrentScore; 
    }

    updateColors();
}

//event listeners
rollDiceButton.addEventListener('click', () => rollDice(currentPlayer));

savePlayer1Button.addEventListener('click', () => saveScore(1));
savePlayer2Button.addEventListener('click', () => saveScore(2)); 

startGameButton.addEventListener('click', startGame);
randomizeDice(diceContainer);
resetGameButton.addEventListener('click', () => window.location.reload());