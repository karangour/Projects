const dice = document.querySelectorAll(".dice");
const current1 = document.querySelector(".current-score1");
const current2 = document.querySelector(".current-score2");
const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");

const newgame = document.querySelector("#new_game");
const roll = document.querySelector("#roll_dice");
const hold = document.querySelector("#hold");

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

const instructions = document.querySelector(".instructions");
const game = document.querySelector(".players");

function initGame() {
  current1.textContent = 0;
  current2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  game.classList.add("blur", "inactive");
  instructions.classList.remove("hidden");
  instructions.addEventListener("click", () => {
    instructions.classList.add("hidden");
    game.classList.remove("blur");
    newGame();
  });
  game.addEventListener("click", () => {
    instructions.classList.add("hidden");
    game.classList.remove("blur");
    newGame();
  });
}

function newGame() {
  player1.classList.add("active");
  player2.classList.remove("active");
  player2.classList.add("inactive");
}
function clearDice() {
  for (let i = 0; i < 3; i++) {
    dice[i].textContent = "\u00A0";
  }
}

function diceAnimation(i) {
  return new Promise((resolve) => {
    if (i < 3) {
      setTimeout(() => {
        setTimeout(() => {
          dice[i].textContent = "\u00A0";
          dice[i].textContent = ".";
        }, 100);

        setTimeout(() => {
          dice[i].textContent = "\u00A0";
          dice[i].textContent = "\u00A0.";
        }, 200);

        setTimeout(() => {
          dice[i].textContent = "\u00A0";
          dice[i].textContent = "\u00A0\u00A0.";
          resolve();
        }, 300);
        setTimeout(() => {
          dice[i].textContent = "\u00A0";
        }, 400);
      }, 100);
    } else {
      setTimeout(() => {
        dice[0].textContent = "";
        dice[1].textContent = "";
        dice[2].textContent = "";
        resolve();
      }, 200);
    }
  });
}

async function displayDice(num) {
  clearDice();
  for (let j = 0; j < 4; j++) {
    await diceAnimation(j);
  }
  switch (num) {
    case 1:
      dice[0].textContent = "\u00A0";
      dice[1].textContent = "\u00A0.";
      dice[2].textContent = "\u00A0";
      break;
    case 2:
      dice[0].textContent = ".";
      dice[1].textContent = "\u00A0";
      dice[2].textContent = "\u00A0\u00A0.";
      break;
    case 3:
      dice[0].textContent = ".";
      dice[1].textContent = "\u00A0.";
      dice[2].textContent = "\u00A0\u00A0.";
      break;
    case 4:
      dice[0].textContent = ".\u00A0.";
      dice[1].textContent = "\u00A0";
      dice[2].textContent = ".\u00A0.";
      break;
    case 5:
      dice[0].textContent = ".\u00A0.";
      dice[1].textContent = "\u00A0.";
      dice[2].textContent = ".\u00A0.";
      break;
    case 6:
      dice[0].textContent = ".\u00A0.";
      dice[1].textContent = ".\u00A0.";
      dice[2].textContent = ".\u00A0.";
  }
}

initGame();
//newGame();

let number = Math.floor(((Math.random() * 10) % 6) + 1);
console.log(number);
console.log(current1, current2);
//displayDice(number);
