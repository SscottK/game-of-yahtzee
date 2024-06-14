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
let roundsRemaining = 13

/*--let cached elements  -----*/

const fullHouseEl = document.querySelector("#full-house");
const scoreBoxEls = document.querySelectorAll(".score-box");
const upperBonus = document.querySelector("#bonus");
const newGameButton = document.querySelector("#new-game");
const rollDiceButton = document.querySelector("#roll-dice");
const endTurnButton = document.querySelector("#end-turn");
const diceImgEls = document.querySelectorAll(".shown-dice");
const diceImgOne = document.querySelector("#dice-first");
const diceImgTwo = document.querySelector("#dice-second");
const diceImgThree = document.querySelector("#dice-third");
const diceImgFour = document.querySelector("#dice-fourth");
const diceImgFive = document.querySelector("#dice-fifth");
// const checkBoxEls = document.querySelectorAll('')

/*----- functions -----*/
const init = () => {
  yahtzeeBonus = 0;
  upperTotal = 0;
  lowerTotal = 0;
  upperScore = 0;
  lowerScore = 0;
  roundsRemaining = 13
  gameOver = false;
  totalScore = 0;
  rollCount = 3;
  keptDice = [];
  diceSum = 0;
  initalNum = 1;
  rollDiceButton.disabled = false;
  endTurnButton.disabled = true;
  turnOver = false;
  diceImgEls.forEach((el) => {
    el.textContent = initalNum;
    initalNum += 1;
    el.classList.remove("keeping");
  });
};

const rollDice = () => {
  let index = 0;
  diceImgEls.forEach((el) => {
    console.log();
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
  diceImgEls.forEach((el) => {
    el.classList.remove("keeping");
  });
};

const removeKeeping = (event) => {
  if (event.target.classList === "keeping") {
    event.target.classList.remove("keeping");
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
  
  console.log(event.target)
};

const fullHouse = () => {
  let sortedDice = keptDice.sort();
  
  if (fullHouseEl.textContent !== '' &&
    sortedDice[0] === sortedDice[1] &&
    sortedDice[0] === sortedDice[2] &&
    sortedDice[3] === sortedDice[4]
  ) {
    fullHouseEl.textContent = 25;
  }
  if (upperTotal >= 63) {
    upperBonus.textContent = 35
  }
};

const diceTotal = (event) => {
    diceSum = 0
    if (event.target.id === 'aces-score' && event.target.textContent === '') {
        keptDice.forEach((dice) => {
            if (dice === 1) {
                diceSum += dice
            }  else if (!keptDice.includes(1)) {
                diceSum = 'X'
            }
        })
        event.target.textContent = diceSum
    }
    

}

const scorePoints = (event) => {
    diceTotal(event) 
  fullHouse()
  turnOver = true;
};



const checkElClicked = (event) => {
  console.log(event.target);
};

/*----- event listeners -----*/
window.addEventListener("load", init);

newGameButton.addEventListener("click", init);

scoreBoxEls.forEach((el) => {
  if (el !== upperBonus) {
    el.addEventListener("click", scorePoints);  }

});

rollDiceButton.addEventListener("click", rollDice);

endTurnButton.addEventListener("click", endTurn);

diceImgOne.addEventListener("click", diceToKeep);
diceImgTwo.addEventListener("click", diceToKeep);
diceImgThree.addEventListener("click", diceToKeep);
diceImgFour.addEventListener("click", diceToKeep);
diceImgFive.addEventListener("click", diceToKeep);
