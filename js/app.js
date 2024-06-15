console.log("I am working");
/*----- constants -----*/
const straightsCombos = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
];

/*----- state variables -----*/
let upperTotal = 0;
let yahtzeeBonus = 0;
let lowerTotal = 0;
let upperScore = 0;
let lowerScore = 0;
let gameOver = false;
let totalScore = 0;
let rollCount = 3;
let keptDice = [];
let diceSum = 0;
let turnOver = false;
let initalNum = 1;
let roundsRemaining = 13;
let justScored = false;

/*--let cached elements  -----*/

const fullHouseEl = document.querySelector("#full-house");
const scoreBoxEls = document.querySelectorAll(".score-box");
const upperBonusEl = document.querySelector("#bonus");
const newGameButton = document.querySelector("#new-game");
const rollDiceButton = document.querySelector("#roll-dice");
const endTurnButton = document.querySelector("#end-turn");
const diceImgEls = document.querySelectorAll(".shown-dice");
const diceImgOne = document.querySelector("#dice-first");
const diceImgTwo = document.querySelector("#dice-second");
const diceImgThree = document.querySelector("#dice-third");
const diceImgFour = document.querySelector("#dice-fourth");
const diceImgFive = document.querySelector("#dice-fifth");
const checkBoxEls = document.querySelectorAll("kept-dice");

/*----- functions -----*/
const init = () => {
  yahtzeeBonus = 0;
  upperTotal = 0;
  lowerTotal = 0;
  upperScore = 0;
  lowerScore = 0;
  roundsRemaining = 13;
  gameOver = false;
  totalScore = 0;
  rollCount = 3;
  keptDice = [];
  diceSum = 0;
  initalNum = 1;
  justScored = false;
  rollDiceButton.disabled = false;
  endTurnButton.disabled = true;
  turnOver = false;
  diceImgEls.forEach((el) => {
    el.textContent = initalNum;
    initalNum += 1;
    el.classList.remove("keeping");
    if (el.style.backgroundColor === "red")
      el.style.backgroundColor = "darkcyan";
  });
  scoreBoxEls.forEach((el) => {
    el.textContent = "";
  });
};

const rollDice = () => {
  let index = 0;
  justScored = false;
  scoreBoxEls.forEach((el) => {
    el.addEventListener("click", scorePoints);
  });
  diceImgEls.forEach((el) => {
    if (!el.className.match("keeping")) {
      el.addEventListener("click", diceToKeep);
    }

    if (!el.className.match("keeping")) {
      let roll = Math.floor(Math.random() * 6 + 1);
      el.textContent = roll;
      keptDice.splice(index, 1, roll);
    }
    index += 1;
  });
  console.log(keptDice);
  rollCount -= 1;

  if (rollCount === 0) {
    rollDiceButton.disabled = true;
    endTurnButton.disabled = false;
    turnOver = true;
  }
};

const endTurn = () => {
  if (turnOver === true) {
    rollCount = 3;
    rollDiceButton.disabled = false;
    endTurnButton.disabled = true;
    turnOver = false;
  }
  // removeKeeping(event)
};

const removeKeeping = (event) => {
  if (event.target.className.match("keeping")) {
    event.target.classList.remove("keeping");
    event.target.removeEventListener("click", removeKeeping);
    changeDiceColor();
  }
};

const diceToKeep = (event) => {
  if (
    event.target === diceImgOne ||
    event.target === diceImgTwo ||
    event.target === diceImgThree ||
    event.target === diceImgFour ||
    event.target === diceImgFive
  ) {
    event.target.classList.add("keeping");
  }
  event.target.addEventListener("click", removeKeeping);

  changeDiceColor();

  console.log(event.target);
};

const changeDiceColor = () => {
  diceImgEls.forEach((el) => {
    if (el.className.match("keeping")) {
      el.style.backgroundColor = "red";
    } else {
      el.style.backgroundColor = "darkcyan";
    }
  });
};

const fullHouse = (event) => {
  let sortedDice = keptDice.sort();
  console.log(sortedDice);
  if (
    event.target === fullHouseEl &&
    fullHouseEl.textContent === "" &&
    sortedDice[0] === sortedDice[1] &&
    sortedDice[0] === sortedDice[2] &&
    sortedDice[3] === sortedDice[4]
  ) {
    fullHouseEl.textContent = "25";
  } else if (event.target === fullHouseEl) {
    fullHouseEl.textContent = "X";
  }
};

const diceTotal = (event) => {
  diceSum = 0;
  if (event.target.id === "aces-score" && event.target.textContent === "") {
    keptDice.forEach((dice) => {
      if (dice === 1) {
        diceSum += dice;
      } else if (!keptDice.includes(1)) {
        diceSum = "X";
      }
    });
    event.target.textContent = diceSum;
  } else if (
    event.target.id === "twos-score" &&
    event.target.textContent === ""
  ) {
    keptDice.forEach((dice) => {
      if (dice === 2) {
        diceSum += dice;
      } else if (!keptDice.includes(2)) {
        diceSum = "X";
      }
    });
    event.target.textContent = diceSum;
  } else if (
    event.target.id === "threes-score" &&
    event.target.textContent === ""
  ) {
    keptDice.forEach((dice) => {
      if (dice === 3) {
        diceSum += dice;
      } else if (!keptDice.includes(3)) {
        diceSum = "X";
      }
    });
    event.target.textContent = diceSum;
  } else if (
    event.target.id === "fours-score" &&
    event.target.textContent === ""
  ) {
    keptDice.forEach((dice) => {
      if (dice === 4) {
        diceSum += dice;
      } else if (!keptDice.includes(4)) {
        diceSum = "X";
      }
    });
    event.target.textContent = diceSum;
  } else if (
    event.target.id === "fives-score" &&
    event.target.textContent === ""
  ) {
    keptDice.forEach((dice) => {
      if (dice === 5) {
        diceSum += dice;
      } else if (!keptDice.includes(5)) {
        diceSum = "X";
      }
    });
    event.target.textContent = diceSum;
  } else if (
    event.target.id === "sixes-score" &&
    event.target.textContent === ""
  ) {
    keptDice.forEach((dice) => {
      if (dice === 6) {
        diceSum += dice;
      } else if (!keptDice.includes(6)) {
        diceSum = "X";
      }
    });
    event.target.textContent = diceSum;
  }
  upperScore += diceSum;
};

const threeOfAKind = (event) => {
  diceSum = 0;
  let sortedDice = keptDice.sort();
  keptDice.forEach((dice) => {
    if (
      event.target.id === "three-kind-score" &&
      sortedDice[0] === sortedDice[1] &&
      sortedDice[0] === sortedDice[2]
    ) {
      diceSum += dice;
    }
  });
  event.target.textContent = diceSum;
};

const scorePoints = (event) => {
  diceTotal(event);
  fullHouse(event);
  threeOfAKind(event);
  justScored = true;
  if (justScored === true) {
    scoreBoxEls.forEach((el) => {
      if (el.id === "upper-score") {
        el.textContent = upperScore;
      }
      if (el.id === "bonus" && upperScore >= 63) {
        el.textContent = "35";
      }
      if (el.id === "upper-total") {
        upperTotal = upperScore + 35;
      }
      el.removeEventListener("click", scorePoints);
      rollDiceButton.disabled = true;
      endTurnButton.disabled = false;
    });
  }

  turnOver = true;
};

const checkElClicked = (event) => {
  console.log(event.target);
};

/*----- event listeners -----*/
window.addEventListener("load", init);

newGameButton.addEventListener("click", init);

rollDiceButton.addEventListener("click", rollDice);

endTurnButton.addEventListener("click", endTurn);

// fullHouseEl.addEventListener("click", fullHouse);
