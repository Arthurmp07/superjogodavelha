document.addEventListener("DOMContentLoaded", () => {
    const boards = document.querySelectorAll('.small-board');
    let currentPlayer = 'x';

    boards.forEach(board => {
        // Create cells for each small board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    });

    function handleCellClick(event) {
        const cell = event.target;
        if (cell.textContent !== '') return;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin(cell.parentElement)) {
            alert(`Player ${currentPlayer.toUpperCase()} wins this board!`);
            cell.parentElement.classList.add('won');
        } else if (isBoardFull(cell.parentElement)) {
            alert("It's a tie!");
        }
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    function checkWin(board) {
        const cells = board.querySelectorAll('.cell');
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    function isBoardFull(board) {
        return Array.from(board.querySelectorAll('.cell')).every(cell => cell.textContent !== '');
    }
});