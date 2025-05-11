// script.js

let currentPlayer = 'X'; // 'X' starts the game
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 grid represented as 1D array
let gameOver = false;

// DOM elements
const squares = document.querySelectorAll('.square');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Initialize event listeners for the squares
squares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
});

// Initialize event listener for the reset button
resetButton.addEventListener('click', resetGame);

// Handle click on a square
function handleSquareClick(event) {
    const index = event.target.getAttribute('data-index');
    
    // If the square is already taken or the game is over, do nothing
    if (gameBoard[index] !== '' || gameOver) {
        return;
    }

    // Update the board and UI
    gameBoard[index] = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());
    event.target.innerText = currentPlayer;

    // Check if the game is over
    if (checkWinner()) {
        statusDisplay.innerText = `${currentPlayer} Wins!`;
        gameOver = true;
        return;
    }

    // Change the turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}

// Check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    squares.forEach(square => {
        square.innerText = '';
        square.classList.remove('x', 'o');
    });
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}
