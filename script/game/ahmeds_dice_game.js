// Main container
const mainCon = document.createElement('div');
mainCon.className = 'diceGame';
document.body.appendChild(mainCon);

// Game title
const header = document.createElement('h2');
header.classList.add('game-title');
header.textContent = 'Ahmed\'s dice duel';
mainCon.appendChild(header);

// NPC Container
const npcBody = document.createElement('div');
npcBody.classList.add('npc', 'top-left');
mainCon.appendChild(npcBody);

// P Element for displaying Computer's score
let pElemOne = document.createElement('p');
pElemOne.classList.add('comp-score');
pElemOne.textContent = 'Ahmed\'s roll: ';
npcBody.appendChild(pElemOne);

// Container for the Dice set
const dices = document.createElement('div');
dices.className = 'diceSet';
mainCon.appendChild(dices);

// PLayer container
const playerCon = document.createElement('div');
playerCon.classList.add('player', 'bottom-right');
mainCon.appendChild(playerCon);

// P Element for displaying Player's score
let pElemTwo = document.createElement('p');
pElemTwo.classList.add('player-score');
pElemTwo.textContent = 'Player\'s roll: ';
playerCon.appendChild(pElemTwo);

// Roll button for the player
const rollBtn = document.createElement('button');
rollBtn.textContent = 'Roll the Dices';
rollBtn.className = 'roll';
mainCon.appendChild(rollBtn);

// Heading element that shows the win/loss messages
const endScreenMsg = document.createElement('h2');
endScreenMsg.classList.add('end-screen', 'hidden');
mainCon.appendChild(endScreenMsg);

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

let computerTotal = 0;

function rollComputerDices() {
  const diceSet = mainCon.querySelector('.diceSet');
  diceSet.innerHTML = '';

  rollBtn.disabled = true;
  setTimeout(() => {
    rollBtn.disabled = false;
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
    pElemOne.innerHTML = `Ahmed's roll: <b style="color: darkred">${computerTotal}</b>`;
  }, 3500);
  updateRollsLeft();
}

function updateRollsLeft() {
  if (attempts >= 2) {
    h1Elem.innerHTML = `Rolls left: <b style="color: green">${attempts}</b>`;
  } else {
    h1Elem.innerHTML = `Rolls left: <b style="color: red">${attempts}</b>`;
  }
}

let h1Elem = document.createElement('h1');
mainCon.appendChild(h1Elem);

let attempts = 3;
let playerTotal = 0;

function rollPlayerDices() {
  if (attempts > 0) {
    attempts--;

    const diceSet = mainCon.querySelector('.diceSet');
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
    rollBtn.disabled = true;
    setTimeout(() => {
      rollBtn.disabled = false;
    }, 3500);

    updateRollsLeft()

    playerTotal = 0;
    for (let i = 0; i < playerDiceValues.length; i++) {
      playerTotal += playerDiceValues[i];
    }
    setTimeout(() => {
      pElemTwo.innerHTML = `Player's roll: <b style="color: darkred">${playerTotal}</b>`;
    }, 3500);
  }
}

function checkWinner() {
  if (playerTotal > computerTotal) {
    setTimeout(() => {
      rollBtn.hidden = true;
      h1Elem.hidden = true;
      pElemTwo.innerHTML = `
        Player's roll: <b style="color: #1d8602">${playerTotal}</b>
      `;
      endScreenMsg.innerHTML = `
        Congratulations I guess... You've beaten me with your lucky a** roll
         <b style="font-size: 26px; color: #1d8602;">${playerTotal}. 
        </b><br>Promise is a promise. Here's your grandpa's (insert item name)</br>
      `;
      endScreenMsg.classList.remove('hidden');
    }, 3500);
  } else if (attempts === 0) {
    setTimeout(() => {
      rollBtn.hidden = true;
      h1Elem.style.color = 'red';
      endScreenMsg.textContent = `HAA NO ONE CAN BEAT AHMED! Show me the moneyyy... That is, if you want
       your grandpa's (insert item name), because it's gonna cost ya.`;
      endScreenMsg.classList.remove('hidden');
    }, 3500);
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
