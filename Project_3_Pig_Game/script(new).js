// Selectors and Initial State
const selectors = {
    dice: document.querySelectorAll(".dice"),
    currentScores: [document.querySelector(".current-score1"), document.querySelector(".current-score2")],
    totalScores: [document.querySelector(".score1"), document.querySelector(".score2")],
    players: [document.getElementById("player1"), document.getElementById("player2")],
    newGameButton: document.querySelector("#new_game"),
    rollButton: document.querySelector("#roll_dice"),
    holdButton: document.querySelector("#hold"),
    instructions: document.querySelector(".instructions"),
    game: document.querySelector(".players")
  };
  
  function initGame() {
    selectors.game.classList.add("blur", "inactive");
    selectors.instructions.classList.remove("hidden");
  
    selectors.instructions.addEventListener("click", startGame);
    selectors.game.addEventListener("click", startGame);
  }
  
  function startGame() {
    selectors.instructions.classList.add("hidden");
    selectors.game.classList.remove("blur");
    //newGame();
  }
  
  function newGame() {
    selectors.currentScores.forEach(score => score.textContent = 0);
    selectors.totalScores.forEach(score => score.textContent = 0);
    selectors.players[0].classList.add("active");
    selectors.players[1].classList.remove("active", "inactive");
  }
  
  function clearDice() {
    selectors.dice.forEach(die => die.textContent = "\u00A0");
  }
  
  async function displayDice(num) {
    clearDice();
    for (let j = 0; j < 4; j++) {
      await diceAnimation(j);
    }
    switch (num) {
      case 1:
        selectors.dice[0].textContent = "\u00A0";
        selectors.dice[1].textContent = "\u00A0.";
        selectors.dice[2].textContent = "\u00A0";
        break;
      case 2:
        selectors.dice[0].textContent = ".";
        selectors.dice[1].textContent = "\u00A0";
        selectors.dice[2].textContent = "\u00A0\u00A0.";
        break;
      case 3:
        selectors.dice[0].textContent = ".";
        selectors.dice[1].textContent = "\u00A0.";
        selectors.dice[2].textContent = "\u00A0\u00A0.";
        break;
      case 4:
        selectors.dice[0].textContent = ".\u00A0.";
        selectors.dice[1].textContent = "\u00A0";
        selectors.dice[2].textContent = ".\u00A0.";
        break;
      case 5:
        selectors.dice[0].textContent = ".\u00A0.";
        selectors.dice[1].textContent = "\u00A0.";
        selectors.dice[2].textContent = ".\u00A0.";
        break;
      case 6:
        selectors.dice[0].textContent = ".\u00A0.";
        selectors.dice[1].textContent = ".\u00A0.";
        selectors.dice[2].textContent = ".\u00A0.";
        break;
    }
  }
  
  function diceAnimation(i) {
    return new Promise((resolve) => {
      if (i < 3) {
        setTimeout(() => {
          setTimeout(() => {
            selectors.dice[i].textContent = ".";
          }, 100);
  
          setTimeout(() => {
            selectors.dice[i].textContent = "\u00A0.";
          }, 200);
  
          setTimeout(() => {
            selectors.dice[i].textContent = "\u00A0\u00A0.";
            resolve();
          }, 300);
  
          setTimeout(() => {
            selectors.dice[i].textContent = "\u00A0";
          }, 400);
        }, 100);
      } else {
        setTimeout(() => {
          selectors.dice[0].textContent = "";
          selectors.dice[1].textContent = "";
          selectors.dice[2].textContent = "";
          resolve();
        }, 200);
      }
    });
  }
  
  function gamePlay() {
    let current = 0;
  
    selectors.rollButton.addEventListener("click", () => {
      const diceroll = Math.floor((Math.random() * 6) + 1);
      displayDice(diceroll);
  
      const activePlayerIndex = selectors.players.findIndex(player => player.classList.contains("active"));
      const currentScore = selectors.currentScores[activePlayerIndex];
      const totalScore = selectors.totalScores[activePlayerIndex];
  
      if (diceroll !== 1) {
        current = parseInt(currentScore.textContent, 10);
        currentScore.textContent = current + diceroll;
      } else {
        totalScore.textContent = 0;
      }
    });
  
    selectors.holdButton.addEventListener("click", () => {
      const activePlayerIndex = selectors.players.findIndex(player => player.classList.contains("active"));
      const currentScore = selectors.currentScores[activePlayerIndex];
      const totalScore = selectors.totalScores[activePlayerIndex];
  
      totalScore.textContent = parseInt(totalScore.textContent, 10) + parseInt(currentScore.textContent, 10);
      currentScore.textContent = 0;
      togglePlayer();
    });
  
    selectors.newGameButton.addEventListener("click", newGame);
  }
  
  function togglePlayer() {
    selectors.players.forEach(player => player.classList.toggle("active"));
  }
  
initGame();
newGame();
  gamePlay();
  