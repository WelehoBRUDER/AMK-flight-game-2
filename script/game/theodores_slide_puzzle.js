// ELEMENTS

function createSlidePuzzleElements() {
  // Main container
  const gameBody = document.createElement('div');
  gameBody.classList.add('container');
  //gameBody.style.display = "none";
  document.body.appendChild(gameBody);

  // NPC Container
  const npcContainer = document.createElement('div');
  npcContainer.classList.add('theodore-container');
  gameBody.appendChild(npcContainer);

  // NPC Header
  const npcHeader = document.createElement('h1');
  npcHeader.classList.add('npc-h1');
  npcHeader.textContent = 'Theodore';
  npcContainer.appendChild(npcHeader);

  // Dialogue Container
  const dialogueCon = document.createElement('div');
  dialogueCon.classList.add('dialogue-container');
  gameBody.appendChild(dialogueCon);

  // Dialogue
  const npcDialogue = document.createElement('h2')
  npcDialogue.classList.add('npc-dialogue')
  dialogueCon.appendChild(npcDialogue)

  // Container for the img
  const imgCon = document.createElement('section');
  imgCon.classList.add('board');
  gameBody.appendChild(imgCon);

  const clock = document.createElement('div');
  clock.classList.add('clock');
  gameBody.append(clock);

  return {gameBody, dialogueCon, npcDialogue, imgCon, clock};
}

// FUNCTIONALITIES
rows = 3;
const columns = 3;

let currTile;
let otherTile; //blank tile

let moves = 0;

const slidePuzzleElements = createSlidePuzzleElements();

class SlideGame {
  constructor(src) {
    this.src = src;

    this.images = [];
    this.timer = new Timer(slidePuzzleElements.clock, loseSlideGame, 90000);
    slidePuzzleElements.gameBody.style.display = 'block';
    slidePuzzleElements.imgCon.classList.remove('locked');
  }

  createImages() {
    for (let y = 0; y < rows; y++) {
      this.images.push([]);
      for (let x = 0; x < columns; x++) {
        const slider = document.createElement('img');
        slider.src = this.src;
        slider.style.objectFit = 'none';
        slider.style.width = '200px';
        slider.style.height = '200px';
        slider.style.left = `${x * 200}px`;
        slider.style.top = `${y * 200}px`;
        slider.setAttribute('data-origin-x', x);
        slider.setAttribute('data-origin-y', y);
        slider.setAttribute('data-x', x);
        slider.setAttribute('data-y', y);
        slider.style.objectPosition = `${Math.round(
            x * (100 / (columns - 1)))}% ${Math.round(
            y * (100 / (rows - 1)))}%`;
        if (y === rows - 1 && x === columns - 1) {
          slider.classList.add('blank-image');
          slider.style.objectFit = 'contain';
          slider.src = 'images/blank.png';
        }
        const options = [0, 0, 0];
        dragElem(slider, [slidePuzzleElements.imgCon], null, swapPlaces,
            options, true, slider, true);
        this.images[y].push(slider);
      }
    }
    this.scrambleImages();
    this.timer.startTimer();
  }

  /* Yoinked from https://stackoverflow.com/a/12646864 */
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  scrambleImages() {
    for (let y = 0; y < rows; y++) {
      this.shuffle(this.images[y]);
    }
    this.shuffle(this.images);
  }

  renderImages() {
    slidePuzzleElements.imgCon.innerHTML = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const image = this.images[y][x];
        image.style.top = `${y * 200}px`;
        image.style.left = `${x * 200}px`;
        image.setAttribute('data-x', x);
        image.setAttribute('data-y', y);
        slidePuzzleElements.imgCon.append(image);
      }
    }
  }

  // This is some absolutely horrible code.
  checkWin() {
    let victoryRoyale = true;
    for (let y = 0; y < rows; y++) {
      let breakOut = false;
      for (let x = 0; x < columns; x++) {
        let expected;
        let image;
        if (x >= columns - 1 && y < columns - 1) {
          expected = {x: 0, y: y + 1};
          image = this.images[y + 1][0];
        } else {
          let increment = x < columns - 1 ? 1 : 0;
          expected = {x: x + increment, y: y};
          image = this.images[y][x + increment];
        }
        const y_ = +image.getAttribute('data-origin-y');
        const x_ = +image.getAttribute('data-origin-x');
        if (!(y_ === expected.y && x_ === expected.x)) {
          victoryRoyale = false;
          breakOut = true;
          break;
        }
      }
      if (breakOut) break;
    }
    return victoryRoyale;
  }
}

const slideGames = ['images/pig.png'];

function startPuzzle() {
}

function swapPlaces(a, b) {
  if (b.classList.contains('blank-image')) {
    const aPos = {x: +a.getAttribute('data-x'), y: +a.getAttribute('data-y')};
    const bPos = {x: +b.getAttribute('data-x'), y: +b.getAttribute('data-y')};
    if (
        (bPos.x + 1 === aPos.x && bPos.y === aPos.y) ||
        (bPos.x - 1 === aPos.x && bPos.y === aPos.y) ||
        (bPos.x === aPos.x && bPos.y + 1 === aPos.y) ||
        (bPos.x === aPos.x && bPos.y - 1 === aPos.y)
    ) {
      const aElem = slideGame.images[aPos.y][aPos.x];
      const bElem = slideGame.images[bPos.y][bPos.x];
      slideGame.images[aPos.y][aPos.x] = bElem;
      slideGame.images[bPos.y][bPos.x] = aElem;
    }
  }
  slideGame.renderImages();
  if (slideGame.checkWin()) {
    slidePuzzleElements.npcDialogue.textContent = translate('theodore_win');
    slidePuzzleElements.imgCon.classList.add('locked');
    const leaveButton = document.createElement('button');
    leaveButton.classList.add('leave-minigame-button');
    leaveButton.textContent = translate('leave');
    kaleviInfoSection.append(leaveButton);
    leaveButton.addEventListener('click', () => {
      game.currentPlayer().lostMinigame();
      leaveButton.remove();
    });
    slidePuzzleElements.gameBody.append(leaveButton);
  }
}

function loseSlideGame() {
  slidePuzzleElements.npcDialogue.textContent = translate('theodore_loss');
  slidePuzzleElements.imgCon.classList.add('locked');
  const leaveButton = document.createElement('button');
  leaveButton.classList.add('leave-minigame-button');
  leaveButton.textContent = translate('leave');
  kaleviInfoSection.append(leaveButton);
  leaveButton.addEventListener('click', () => {
    game.currentPlayer().lostMinigame();
    leaveButton.remove();
  });
  slidePuzzleElements.gameBody.append(leaveButton);
}

let slideGame;

// const slideGame = new SlideGame(slideGames[0]);
// slideGame.createImages();
// slideGame.renderImages();

function slaughterPig() {
  slidePuzzleElements.gameBody.style.display = 'none';
  slidePuzzleElements.imgCon.innerHTML = '';
}

