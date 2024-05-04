// Main container
const mainCon = document.createElement('div');
mainCon.className = 'diceGame';
document.body.appendChild(mainCon);

// NPC Container
const computerCon = document.createElement('div');
computerCon.className = 'computer';
mainCon.appendChild(computerCon);

// Container for NPC's dices
const computerDices = document.createElement('div');
computerDices.className = 'diceSet';
computerCon.appendChild(computerDices);

// PLayers container
const playerCon = document.createElement('div');
playerCon.className = 'player';
mainCon.appendChild(playerCon);

// Container for player's dices
const playerDices = document.createElement('div');
playerDices.className = 'diceSet';
playerCon.appendChild(playerDices);

// Roll button for the player
const rollBtn = document.createElement('button');
rollBtn.textContent = 'Roll the Dices';
rollBtn.className = 'roll';
playerCon.appendChild(rollBtn);

function diceCreation() {
  const diceClass = document.createElement('div');
  diceClass.className = 'dice';

  const faceClasses = ['front', 'back', 'top', 'bottom', 'right', 'left'];

  for (let i = 0; i < faceClasses.length; i++) {
    const face = document.createElement('div');
    face.className = `face ${faceClasses[i]}`;
    diceClass.appendChild(face);
  }
  return diceClass;
}

let pElemOne = document.createElement('p');
computerCon.appendChild(pElemOne);
let computerTotal = 0;

function rollComputerDices() {
  const diceSet = computerCon.querySelector('.diceSet');
  diceSet.innerHTML = '';

  rollBtn.hidden = true;
  setTimeout(() => {
    rollBtn.hidden = false;
  }, 3500);

  const compDiceValues = [];

  // Create and append three separate dice models for the comp
  for (let i = 0; i < 3; i++) {
    const compDice = diceCreation();
    diceSet.appendChild(compDice);

    const value = Math.floor(Math.random() * 6) + 1;
    compDiceValues.push(value);

    console.log('Comp dice values: ', compDiceValues);

    displayDiceValues(compDice, [value]);
  }
  for (let i = 0; i < compDiceValues.length; i++) {
    computerTotal += compDiceValues[i];
  }
  setTimeout(() => {
    pElemOne.textContent = `Ahmed's total: ${computerTotal}`;
  }, 3500);
}

let h1Elem = document.createElement('h1');
let pElemTwo = document.createElement('p');
mainCon.appendChild(h1Elem);
playerCon.appendChild(pElemTwo);

let attempts = 3;
let playerTotal = 0;

function rollPlayerDices() {
  if (attempts > 0) {
    attempts--;

    const diceSet = playerCon.querySelector('.diceSet');
    diceSet.innerHTML = '';

    const playerDiceValues = [];

    // Create and append three separate dice models for the player
    for (let i = 0; i < 3; i++) {
      const playerDice = diceCreation();
      diceSet.appendChild(playerDice);

      const value = Math.floor(Math.random() * 6) + 1;
      playerDiceValues.push(value);

      console.log('Player dice values: ' + playerDiceValues);

      displayDiceValues(playerDice, [value]);
    }
    h1Elem.textContent = 'Attempts left ' + attempts + '.';

    playerTotal = 0;
    for (let i = 0; i < playerDiceValues.length; i++) {
      playerTotal += playerDiceValues[i];
    }
    setTimeout(() => {
      pElemTwo.textContent = `Player's total: ${playerTotal}`;
    }, 3500);
  }
}

function checkWinner() {
  if (playerTotal > computerTotal) {
    setTimeout(() => {
      rollBtn.hidden = true;
      h1Elem.hidden = true;
      pElemTwo.innerHTML = `
        <p>Congratulations you've defeated me with a score of <b style="font-size: 18px; color: #1d8602;">${playerTotal}</b>.<br>Promise is a promise. Here's your (insert item name)</br></p>
      `;
    }, 3500);
  } else if (attempts === 0) {
    setTimeout(() => {
      rollBtn.hidden = true;
      pElemTwo.textContent = `You didn't beat me this time. Unfortunately (insert item name) is gonna cost you.`;
    });
  }
}

function displayDiceValues(dice, values) {
  dice.style.animation = 'rolling 3s';
  setTimeout(() => {
    values.forEach((value) => {
      const rotation = getRotationForValue(value);

      dice.style.transition = '0.2s';
      dice.style.animationFillMode = 'forwards';
      dice.style.transform = rotation;
      setTimeout(() => {
        dice.style.transition = '1s ease';
      }, 200);
    });

    dice.style.animation = 'none';
  }, 3050);
}

function getRotationForValue(value) {
  switch (value) {
    case 1:
      return 'rotateX(0deg) rotateY(0deg)';
    case 6:
      return 'rotateX(180deg) rotateY(0deg)';
    case 2:
      return 'rotateX(-90deg) rotateY(0deg)';
    case 5:
      return 'rotateX(90deg) rotateY(0deg)';
    case 3:
      return 'rotateX(0deg) rotateY(90deg)';
    case 4:
      return 'rotateX(0deg) rotateY(-90deg)';
    default:
      return 'rotateX(0deg) rotateY(0deg)';
  }
}

window.addEventListener('DOMContentLoaded', rollComputerDices);
rollBtn.addEventListener('click', () => {
  rollPlayerDices();
  checkWinner();
});
