const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("animated");

  if (checkWinner()) {
    status.innerHTML = `😊 Player ${currentPlayer} Wins!`;
    highlightWin(checkWinner());
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    status.textContent = "😮 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Your Turn (${currentPlayer})`;

  if (currentPlayer === "O") {
    setTimeout(playComputer, 500);
  }
}

function playComputer() {
  if (!gameActive) return;

  let emptyIndexes = boardState.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  if (emptyIndexes.length === 0) return;

  let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  let cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);

  boardState[randomIndex] = "O";
  cell.textContent = "O";
  cell.classList.add("animated");

  if (checkWinner()) {
    status.innerHTML = `😊 Computer (O) Wins!`;
    highlightWin(checkWinner());
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    status.textContent = "😮 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  status.textContent = `Your Turn (X)`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWin(pattern) {
  pattern.forEach(index => {
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.classList.add("win");
  });
}

function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Your Turn (X)";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("animated", "win");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
