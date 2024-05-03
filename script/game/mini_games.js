// Main container
const mainCon = document.createElement('div');
mainCon.className = 'diceGame';
document.body.appendChild(mainCon);

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

// NPC Container
const computerCon = document.createElement('div');
computerCon.className = 'computer';
mainCon.appendChild(computerCon);

// Container for NPC's dices
const computerDices = document.createElement('div');
computerDices.className = 'diceSet';
computerCon.appendChild(computerDices);

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

function rollComputerDices() {
  const diceSet = computerCon.querySelector('.diceSet');
  diceSet.innerHTML = '';

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
}

function rollPlayerDices() {
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
}

function displayDiceValues(dice, values) {
  dice.style.animation = 'rolling 3s';
  setTimeout(() => {
    values.forEach((value) => {
      const rotation = getRotationForValue(value);

      dice.style.transition = '0.2s';
      dice.style.animationFillMode = 'forwards'
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
rollBtn.addEventListener('click', rollPlayerDices);
