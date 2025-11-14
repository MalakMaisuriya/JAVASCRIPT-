document.addEventListener("DOMContentLoaded", () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;
  let scoreX = 0, scoreO = 0, scoreDraw = 0;

  const cells = document.querySelectorAll(".cell");
  const playerX = document.getElementById("playerX");
  const playerO = document.getElementById("playerO");
  const draw = document.getElementById("draw");
  const resetBtn = document.getElementById("resetBtn");

  const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const index = cell.dataset.index;
      if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  });

  function checkWinner() {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        isGameActive = false;
        Swal.fire({
          title: `🎉 Player ${board[a]} Wins!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        });
        board[a] === "X" ? scoreX++ : scoreO++;
        updateScore();
        setTimeout(resetBoard, 1300); 
        return;
      }
    }

    if (!board.includes("")) {
      isGameActive = false;
      Swal.fire({
        title: "🤝 It's a Draw!",
        icon: "info",
        showConfirmButton: false,
        timer: 1000
      });
      scoreDraw++;
      updateScore();
      setTimeout(resetBoard, 1100);
    }
  }

  function updateScore() {
    playerX.textContent = `X: ${scoreX}`;
    playerO.textContent = `O: ${scoreO}`;
    draw.textContent = `Draw: ${scoreDraw}`;
  }

  function resetBoard() {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    isGameActive = true;
    currentPlayer = "X";
  }

  resetBtn.addEventListener("click", resetBoard);
});
