let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let backBtn = document.getElementById('backBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let player1 = document.getElementById("p1");
let player2 = document.getElementById("p2");
let player1Score = 0;
let player2Score = 0;

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

// ------------------------------------- bot mode
let isSinglePlayer = false;
let botScore = 0;



const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

if (!spaces[id]) {
spaces[id] = currentPlayer;
e.target.innerText = currentPlayer;

if (playerHasWon() !== false) {
    playerText.innerHTML = `${currentPlayer === X_TEXT ? player1.value : player2.value} has won!`;

    if (currentPlayer === X_TEXT) {
        player1Score++;
        document.getElementById('scorePlayer1').innerText = player1Score;
    } else {
        console.log(gameMode);
        if (gameMode === "pvp") {
            player2Score++;
            document.getElementById('scorePlayer2').innerText = player2Score;
            

        } else {
            botScore++;
            document.getElementById('scoreBot').innerText = botScore;
            
        }
    }

    let winning_blocks = playerHasWon();
    winning_blocks.forEach(box => {
        boxes[box].style.backgroundColor = winnerIndicator;
    });

    if (races.innerHTML === "Round 5" && player1Score + player2Score + botScore === 5) {
        Swal.fire(
            'Good job!',
            (`Game over! ${player1Score > player2Score ? player1.value : player2.value} wins the round.`),
            'success'
            )
        restart();
        restartValue();
    } else if (races.innerHTML === "Round 10" && player1Score + player2Score + botScore === 10) {
        Swal.fire(
            'Good job!',
            (`Game over! ${player1Score > player2Score ? player1.value : player2.value} wins the round.`),
            'success'
            )
        restart();  
        restartValue();
    }

    return;
}

currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

// Update playerText with the next player's turn
playerText.innerHTML = `Next move: ${currentPlayer === X_TEXT ? player1.value : player2.value}`;
}
// ---------------------------------------------bot condition
if (isSinglePlayer && currentPlayer === O_TEXT) {
setTimeout(() => {
    botMove();
}, 500);
}

}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);
backBtn.addEventListener('click', back);

// ------------------------------------------bot function

function botMove() {
    const emptySpaces = spaces.map((value, index) => (value === null ? index : null)).filter(value => value !== null);
    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
    const boxId = emptySpaces[randomIndex];
    const box = document.getElementById(boxId.toString());
    box.click();
}

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

function restartValue() {
    player1Score = 0;
    player2Score = 0; 
    botScore = 0;
    document.getElementById('scorePlayer1').innerText = player1Score;
    document.getElementById('scorePlayer2').innerText = player2Score;
    document.getElementById('scoreBot').innerText = botScore;
    
}

startGame();
