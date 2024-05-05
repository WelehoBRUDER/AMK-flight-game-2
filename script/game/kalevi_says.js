// ELEMENTS

// Game body
const gameBody = document.createElement('div');
gameBody.className = 'kalevis-body';
document.body.appendChild(gameBody);

// Main container
const mainCon = document.createElement('div');
mainCon.className = 'game';
gameBody.appendChild(mainCon);

// Heading
const hElem = document.createElement('h1');
hElem.className = 'heading';
hElem.textContent = 'Kalevi Says';
mainCon.appendChild(hElem);

// Container for the tiles
const tilesBody = document.createElement('section');
tilesBody.classList.add('tile-container', 'unclickable');
mainCon.appendChild(tilesBody);

// Creation of each tile
const tileSet = [
  {class: 'tile tile-red', data: 'red'},
  {class: 'tile tile-green', data: 'green'},
  {class: 'tile tile-blue', data: 'blue'},
  {class: 'tile tile-yellow', data: 'yellow'},
];

for (let i = 0; i < tileSet.length; i++) {
  const tile = document.createElement('div');
  tile.className = tileSet[i].class;
  tile.setAttribute('data-tile', tileSet[i].data);
  tilesBody.appendChild(tile);
}

// Container for the information
const infoSec = document.createElement('div');
infoSec.className = 'info-section';
mainCon.appendChild(infoSec);

// Start button
const startBtn = document.createElement('button');
startBtn.classList.add('start-button');
startBtn.textContent = 'Start';
infoSec.appendChild(startBtn);

// Info
const information = document.createElement('span');
information.classList.add('info', 'hidden');
infoSec.appendChild(information);

// Container for audio
const audioCon = document.createElement('div');
audioCon.className = 'hidden';
document.body.appendChild(audioCon);

// Audio for each of the tiles
const audioData = [
  {src: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', sound: 'red'},
  {
    src: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
    sound: 'green',
  },
  {src: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', sound: 'blue'},
  {
    src: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
    sound: 'yellow',
  },
];

for (let i = 0; i < audioData.length; i++) {
  const audioElem = document.createElement('audio');
  audioElem.src = audioData[i].src;
  audioElem.setAttribute('data-sound', audioData[i].sound);
  audioCon.appendChild(audioElem);
}

// FUNCTIONALITIES

let sequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.querySelector('.start-button');
const info = document.querySelector('.info');
const heading = document.querySelector('.heading');
const tileContainer = document.querySelector('.tile-container');

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Wait for Urho Kalevi to show you the pattern.';
  nextRound();
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Wait for Urho Kalevi';
  hElem.textContent = `Round ${level} of 6`;

  const nextSequence = [...sequence];
  nextSequence.push(nextPattern());
  play(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level * 600 + 1000);
}

function nextPattern() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function play(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function resetGame(text) {
  info.textContent = text;
  sequence = [];
  playerSequence = [];
  level = 0;
  heading.textContent = 'Kalevi Says';
  tileContainer.classList.add('unclickable');
}

function playerTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn! Taps required: ${level}`;
}

function handleClick(tile) {
  const index = playerSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - playerSequence.length;

  if (playerSequence[index] !== sequence[index]) {
    resetGame('You were no match for Kekkonen. (insert item name) is gonna cost you!');
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 6) {
      resetGame("*Kekkonen is impressed* Congratulations you've bested me! Here's you (insert item name)");
      return
    }

    playerSequence = [];
    info.textContent = 'Success!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Taps remaining: ${remainingTaps}`;
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const {tile} = event.target.dataset;
  if (tile) handleClick(tile);
});
