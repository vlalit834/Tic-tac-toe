let cells = document.querySelectorAll(".cell");
let reset_btn = document.querySelector(".rbtn");
let win = document.querySelector(".win");
let winner = document.querySelector("#winner");
let new_game_btn = document.querySelector("#new_game");

const win_pat = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playerX = true;
let found_winner = false;
let count = 0;

const reset_game = () => {
  playerX = true;
  found_winner = false;
  enable_cell();
  count = 0;
  win.classList.add("hide");
  reset_btn.classList.add("hide");
};

const enable_cell = () => {
  for (let cell of cells) {
    cell.disabled = false;
    cell.innerText = "";
  }
};

const disable_cell = () => {
  for (let cell of cells) {
    cell.disabled = true;
  }
};

new_game_btn.addEventListener("click", reset_game);
reset_btn.addEventListener("click", reset_game);

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    count++;
    reset_btn.classList.remove("hide");
    if (found_winner === false) {
      if (playerX === true) {
        cell.innerText = `X`;
        playerX = false;
      } else {
        cell.innerText = `O`;
        playerX = true;
      }
      if (check_winner() === true) {
        found_winner = true;
      }
    }
    if (count % 9 === 0) {
      draw();
    }
    cell.disabled = true;
  });
});

const show_winner = (pwinner) => {
  winner.innerText = `${pwinner} WON`;
  win.classList.remove("hide");
  reset_btn.classList.add("hide");
  disable_cell();
};

const check_winner = () => {
  for (let pat of win_pat) {
    const [a, b, c] = pat;
    if (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      show_winner(cells[a].innerText);
      return true;
    }
  }
  return false;
};

const draw = () => {
  winner.innerHTML = `<strong>DRAW</strong>`;
  win.classList.remove("hide");
};
