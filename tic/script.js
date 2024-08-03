// script.js

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute("data-index");

        if (board[cellIndex] !== "" || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (boardFull()) {
            messageElement.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function boardFull() {
        return board.every(cell => cell !== "");
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetButton.addEventListener("click", resetGame);
});
