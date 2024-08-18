const createBoard = (rows = 4, cols = 4) => {
    if(rows > 6 || cols > 6 || cols < 1 || rows < 1) {
       alert("you can create upto 6 col and row")
        return false;
    }
    let board = document.createElement("div");

    // Updated color combination for the board and cells
    board.classList.add("board", "inline-grid",  "border-4", "p-4", "bg-gray-800", `grid-cols-${cols}`, "gap-3", "rounded-lg");

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.classList.add("border", "border-gray-600", "hover:cursor-pointer", "text-white", "bg-gray-700", "h-16", "w-16", "flex", "items-center", "justify-center", "rounded-md", "hover:bg-gray-600", "transition-colors", "duration-200");
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
        }
    }

    const filledArray = fillBoard(board);
    return {
        "board": board,
        "filledArray": filledArray
    };
}

const fillBoard = (board) => {
    const childrenNodes = board.children;
    const len = childrenNodes.length;
    const arr = [];

    for (let child of childrenNodes) {
        arr.push(Math.random().toFixed(2));
    }

    const randomNumber = Math.floor(Math.random() * len);
    arr[randomNumber] = "x";
    return arr;
}

const handleGameLogic = (board, array) => {
    const gameResultDiv = document.querySelector('.game-result');
    const resultElement = document.getElementById('result');
    const messageElement = document.getElementById('message');
    let clickedCells = 0;
    const totalSafeCells = array.filter(item => item !== "x").length;

    Array.from(board.children).forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.textContent !== "") return; // Prevent clicking the same cell multiple times
            cell.textContent = array[index];

            if (array[index] === "x") {
                cell.style.backgroundColor = "red";
                handleGameEnd(cell, gameResultDiv, resultElement, messageElement, false);
            } else {
                cell.style.backgroundColor = "green";
                clickedCells++;
                if (clickedCells === totalSafeCells) {
                    handleGameEnd(cell, gameResultDiv, resultElement, messageElement, true);
                }
            }
        });
    });
}

function handleGameEnd(cell, gameResultDiv, resultElement, messageElement, isWin) {
    gameResultDiv.style.display = "flex";

    if (isWin) {
        resultElement.textContent = "You Win!";
        messageElement.textContent = "Congratulations, you avoided all the bombs!";
        resultElement.style.color = "#48bb78"; // Green color for win
    } else {
        resultElement.textContent = "You Lose";
        messageElement.textContent = "You hit the bomb!";
        resultElement.style.color = "#f56565"; // Red color for lose
    }

    // Styling adjustments
    resultElement.style.fontSize = "2.5rem";
    resultElement.style.fontWeight = "bold";
    messageElement.style.color = "#ffffff"; // White color
    messageElement.style.fontSize = "1.25rem";
}

const startGame = (row, col) => {
    const board = createBoard(row, col);
    if(!board){
        alert("Please referseh the page and try again ")
        return;
    }
    document.getElementById('area').appendChild(board.board);
    handleGameLogic(board.board, board.filledArray);
    console.log(board);
}
const resetGame = (row, col) => {
    const gameResultDiv = document.querySelector('.game-result');
    const gameArea = document.getElementById("area");
    const rows = document.getElementById("rows").value;
    const cols = document.getElementById("cols").value;

    // Hide the game result div
    gameResultDiv.style.display = "none";

    // Clear the game board
    gameArea.innerHTML = "";

    // Start a new game
    startGame(parseInt(rows), parseInt(cols));
}

document.getElementsByClassName("restart-btn")[0].addEventListener("click", resetGame);
window.onload = (event) => {
    const setupArea = document.getElementById("setupArea");
    const gameArea = document.getElementById("area");
    gameArea.innerHTML = "";
    setupArea.classList.remove("hidden");
    setupArea.classList.add("flex");
    document.getElementById("startButton").addEventListener("click", function() {

        const rows = document.getElementById("rows").value;
        const cols = document.getElementById("cols").value;

        console.log(`Rows: ${rows}, Columns: ${cols}`);

        // Hide the setup area
        setupArea.classList.remove("flex");
        setupArea.classList.add("hidden");

        // Start the game with the selected rows and columns
        startGame(parseInt(rows), parseInt(cols));
    });
};

document.getElementById("boardSizeButton").addEventListener("click", function() {
    const setupArea = document.getElementById("setupArea");
    const gameArea = document.getElementById("area");
    gameArea.innerHTML = "";
    // Toggle visibility using a class
    if (setupArea.classList.contains("hidden")) {
        setupArea.classList.remove("hidden");
        setupArea.classList.add("flex");
    } else {
        setupArea.classList.remove("flex");
        setupArea.classList.add("hidden");
    }
});




