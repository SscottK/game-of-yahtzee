/*----- constants -----*/
const smallStraights = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
];
const largeStraights = [
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
];

/*----- state variables -----*/
let upperTotal = 0;
let yahtzeeBonus = 0;
let upperScore = 0;
let lowerScore = 0;
let gameOver = false;
let totalScore = 0;
let rollCount = 3;
let keptDice = [];
let diceSum = 0;
let turnOver = false;
let initalNum = 1;
let roundsRemaining = 16;
let justScored = false;
let bonusCount = 3;
let bonusScore = 0;
let chanceScore = 0;

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
const yahtzeeBonusEl = document.querySelector("#yahtzee-bonus");
const winLossMessageEl = document.querySelector("#win-loss-message");

/*----- functions -----*/
const init = () => {
  yahtzeeBonus = 0;
  upperTotal = 0;
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
  bonusCount = 3;
  bonusScore = 0;
  chanceScore = 0;
  winLossMessageEl.textContent = "";
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
    if (el.textContent === "" && el.id !== "yahtzee-bonus") {
      el.addEventListener("click", scorePoints);
    }
    if (el.id === "yahtzee" && el.textContent === "50") {
      yahtzeeBonusEl.addEventListener("click", scorePoints);
    }
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

  rollCount -= 1;

  if (rollCount === 0) {
    rollDiceButton.disabled = true;    
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
    el.removeEventListener("click", removeKeeping);

    changeDiceColor();
  });
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
    if (
      event.target.id === "full-house" &&
        (sortedDice[0] === sortedDice[2] &&
        sortedDice[3] === sortedDice[4]) ||
      (sortedDice[0] === sortedDice[1] && sortedDice[2] === sortedDice[4])
    ) {
      lowerScore += 25;
      totalScore += 25;

      fullHouseEl.textContent = "25";
    } else if (event.target.id === "full-house") {
      fullHouseEl.textContent = 0;
    }
  
};

const diceTotal = (event) => {
  diceSum = 0;
  if (event.target.id === "aces-score" && event.target.textContent === "") {
    keptDice.forEach((dice) => {
      if (dice === 1) {
        diceSum += dice;
      } else if (!keptDice.includes(1)) {
        diceSum = 0;
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
        diceSum = 0;
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
        diceSum = 0;
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
        diceSum = 0;
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
        diceSum = 0;
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
        diceSum = 0;
      }
    });
    event.target.textContent = diceSum;
  }
  upperScore += diceSum;

  totalScore += diceSum;
};

const threeOfAKind = (event) => {
  diceSum = 0;
  let sortedDices = keptDice.sort();
  if (
    event.target.id === "three-kind-score" &&
    event.target.textContent === ""
  ) {
    keptDice.forEach((dice) => {
      if (
        (sortedDices[0] === sortedDices[1] &&
          sortedDices[0] === sortedDices[2]) ||
        (sortedDices[1] === sortedDices[2] &&
          sortedDices[1] === sortedDices[3]) ||
        (sortedDices[2] === sortedDices[3] && sortedDices[2] === sortedDices[4])
      ) {
        diceSum += dice;

        event.target.textContent = diceSum;
      } else if (event.target.id === "three-kind-score") {
        event.target.textContent = 0;
      }
    });
  }
  lowerScore += diceSum;
  totalScore += diceSum;
};

const fourOfAKind = (event) => {
  diceSum = 0;
  let sortedDices = keptDice.sort();
  if (event.target.id === "four-kind-score") {
  keptDice.forEach((dice) => {
    if (
      (
        sortedDices[0] === sortedDices[1] &&
        sortedDices[0] === sortedDices[2] &&
        sortedDices[0] === sortedDices[3]) ||
      (sortedDices[1] === sortedDices[2] &&
        sortedDices[1] === sortedDices[3] &&
        sortedDices[1] === sortedDices[4])
    ) {
      diceSum += dice;

      event.target.textContent = diceSum;
    } else if (event.target.id === "four-kind-score") {
      event.target.textContent = 0;
    }
  });
}
  lowerScore += diceSum;
  totalScore += diceSum;
};

const smallStraightsChecker = (event) => {
  let sorted = keptDice.filter((num, index) => {
    return keptDice.indexOf(num) === index;
  });
  let frontDiff = sorted[3] - sorted[0];
  let midDiff = sorted[4] - sorted[1];

  if (
    event.target.id === "small-straight" &&
    (frontDiff === 3 || midDiff === 3)
  ) {
    console.log("small", event.target);
    event.target.textContent = 30;
    lowerScore += 30;
    totalScore += 30;
  } else if (
    event.target.id === "small-straight" &&
    (frontDiff !== 3 || midDiff !== 3)
  ) {
    event.target.textContent = 0;
  }
};

const largeStraightChecker = (event) => {
  let sorted = keptDice.filter((num, index) => {
    return keptDice.indexOf(num) === index;
  });

  let differential = sorted[4] - sorted[0];

  if (event.target.id === "large-straight" && differential === 4) {
    console.log("large", event.target);
    event.target.textContent = 40;
    lowerScore += 40;
    totalScore += 40;
  } else if (event.target.id === "large-straight" && differential !== 4) {
    event.target.textContent = 0;
  }
};

const yahtzee = (event) => {
  let yahtzeeSorted = keptDice.sort();
  if (event.target.id === "yahtzee" && yahtzeeSorted[0] === yahtzeeSorted[4]) {
    event.target.textContent = 50;
    lowerScore += 50;
    totalScore += 50;
  } else if (
    event.target.id === "yahtzee" &&
    yahtzeeSorted[0] !== yahtzeeSorted[4]
  ) {
    event.target.textContent = 0;
  }

  if (event.target.id === "yahtzee-bonus" && bonusCount > 0) {
    scoreBoxEls.forEach((el) => {
      if (el.id == "yahtzee" && el.textContent === "50") {
        lowerScore += 100;
        totalScore += 100;
        bonusCount -= 1;
        event.target.textContent = "✔ ";
      }
    });
  }
};
const chance = (event) => {
  if (event.target.id === "chance") {
    keptDice.forEach((dice) => {
      chanceScore += dice;
    });
    event.target.textContent = chanceScore;
    lowerScore += chanceScore;
    totalScore += chanceScore;
  }
};

const gamewinner = () => {
  if (totalScore >= 200) {
    winLossMessageEl.textContent = `Your score of ${totalScore} was over 250. You Win!`;
  } else if (gameOver) {
    winLossMessageEl.textContent = `Your score of ${totalScore} was under 250. You Lose!`;
  }
};

const scorePoints = (event) => {
  roundsRemaining -= 1;
  console.log(roundsRemaining);
  diceTotal(event);
  fullHouse(event);
  threeOfAKind(event);
  fourOfAKind(event);
  smallStraightsChecker(event);
  largeStraightChecker(event);
  yahtzee(event);
  chance(event);
  justScored = true;
  if (justScored === true) {
    endTurnButton.disabled = false
    scoreBoxEls.forEach((el) => {
      if (el.id === "upper-score") {
        el.textContent = upperScore;
      }
      if (el.id === "bonus" && upperScore >= 63) {
        upperScore += 35;
        el.textContent = "35";
      }
      if (el.id === "upper-total") {
        upperTotal = upperScore;
        el.textContent = upperTotal;
      }

      if (el.id === "lower-total") {
        el.textContent = lowerScore;
      }
      if (el.id === "totals") {
        el.textContent = totalScore;
      }
      turnOver = true;
      if (roundsRemaining === 0) {
        rollDiceButton.disabled = true;
        endTurnButton.disabled = true;
        gameOver = true;
        gamewinner();
      }
      if (gameOver === false) {
        el.removeEventListener("click", scorePoints);
        rollDiceButton.disabled = true;
        endTurnButton.disabled = false;
      }
    });
  }
};

/*----- event listeners -----*/
window.addEventListener("load", init);

newGameButton.addEventListener("click", init);

rollDiceButton.addEventListener("click", rollDice);

endTurnButton.addEventListener("click", endTurn);
