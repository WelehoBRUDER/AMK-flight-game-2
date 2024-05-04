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
hElem.textContent = 'Kalevi Says';
mainCon.appendChild(hElem);

// Container for the tiles
const tilesBody = document.createElement('section');
tilesBody.className = 'tile-container';
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
startBtn.className = 'start-button js-start';
startBtn.textContent = 'Start';
infoSec.appendChild(startBtn);

// Info
const information = document.createElement('span');
information.className = 'info js-info hidden';
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