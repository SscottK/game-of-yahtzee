console.log("I am working");
/*----- constants -----*/
const straightsCombos = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
];
const keptDice = [1, 3, 1, 1, 3];

/*----- state variables -----*/
let upperTotal = 0;
let yahtzeeBonus = 0;
let lowerTotal = 0;
let upperScore = 0;
let lowerScore = 0;
let gameOver = false;
let totalScore = 0;
let rollCount = 3;
let keptDiceArray = [];
let diceSum = 0;
let turnOver = false;

/*--let cached elements  -----*/

const fullHouseEl = document.querySelector("#full-house");
const scoreBoxEls = document.querySelectorAll(".score-box");
const upperBonus = document.querySelector("#bonus");
const newGameButton = document.querySelector("#new-game");
const rollDiceButton = document.querySelector("#roll-dice");
const endTurnButton = document.querySelector("#end-turn");
const diceImgEls = document.querySelectorAll(".shown-dice");
// const checkBoxEls = document.querySelectorAll('')

/*----- functions -----*/
const init = () => {
  yahtzeeBonus = 0;
  upperTotal = 0;
  lowerTotal = 0;
  upperScore = 0;
  lowerScore = 0;
  gameOver = false;
  totalScore = 0;
  rollCount = 3;
  keptDiceArray = [];
  diceSum = 0;
  rollDiceButton.disabled = false;
  endTurnButton.disabled = true;
  turnOver = false;
};

const rollDice = () => {
  diceImgEls.forEach((el) => {
    el.textContent = Math.floor(Math.random() * 6);
  });
  rollCount -= 1;
  console.log(rollCount);
  if (rollCount === 0) {
    rollDiceButton.disabled = true;
    endTurnButton.disabled = false;
    turnOver = true; //remove after added to scoring function
    console.log(turnOver);
  }
};
// put in scoring function turnOver = true
const endTurn = () => {
  if (turnOver === true) {
    rollCount = 3;
    rollDiceButton.disabled = false;
    endTurnButton.disabled = true;
    turnOver = false;
  }
};

const fullHouse = () => {
  let sortedDice = keptDice.sort();

  if (
    sortedDice[0] === sortedDice[1] &&
    sortedDice[0] === sortedDice[2] &&
    sortedDice[3] === sortedDice[4]
  ) {
    fullHouseEl.textContent = 25;
  }
};

const scorePoints = () => {
    
}

const checkElClicked = (event) => {
  console.log(event.target);
};

/*----- event listeners -----*/
window.addEventListener("load", init);

newGameButton.addEventListener("click", init);

scoreBoxEls.forEach((el) => {
  if (el !== upperBonus) {
    el.addEventListener("click", checkElClicked);
  }
});

rollDiceButton.addEventListener("click", rollDice);

endTurnButton.addEventListener("click", endTurn);
