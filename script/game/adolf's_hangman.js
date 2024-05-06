// ELEMENTS
function createElements() {

  // Game body
  const gameBody = document.createElement('div');
  gameBody.className = 'game-body';
  document.body.appendChild(gameBody);

  // Hangman container
  const hangmanCon = document.createElement('div');
  hangmanCon.classList.add('hangman-container');
  gameBody.appendChild(hangmanCon);

  // Hangman img
  const hangmanImg = document.createElement('img');
  hangmanCon.appendChild(hangmanImg);

  // Hangman title
  const hangmanTitle = document.createElement('h1');
  hangmanTitle.innerHTML = `Adolf's Hangman`;
  hangmanTitle.classList.add('hangman-title');
  hangmanCon.appendChild(hangmanTitle);

  hangmanImg.src = 'images/hangman-0.svg';
  hangmanImg.alt = 'hangman image';

  // Gameplay container
  const gameplayCon = document.createElement('div');
  gameplayCon.className = 'main-container';
  gameBody.appendChild(gameplayCon);

  // Word display boxes
  const wordDisplay = document.createElement('ul');
  wordDisplay.classList.add('display-boxes');
  gameplayCon.appendChild(wordDisplay);

  // Hint container
  const hintCon = document.createElement('section');
  hintCon.classList.add('hint-container');
  gameplayCon.appendChild(hintCon);

  // Hint title
  const hintTitle = document.createElement('h3');
  hintTitle.textContent = 'Adolf\'s hint';
  hintTitle.classList.add('hint-title');
  hintCon.appendChild(hintTitle);

  // Hint display
  const hintDisplay = document.createElement('h2');
  hintDisplay.classList.add('hint-display');
  hintCon.appendChild(hintDisplay);

  // Guesses display (Correct/Incorrect)
  const guessDisplay = document.createElement('h2');
  guessDisplay.classList.add('guess-display');
  gameplayCon.appendChild(guessDisplay);

  // Keyboard
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  gameplayCon.appendChild(keyboard);

  return {
    gameBody,
    hangmanCon,
    hangmanImg,
    hangmanTitle,
    gameplayCon,
    wordDisplay,
    hintCon,
    hintTitle,
    hintDisplay,
    guessDisplay,
    keyboard,
  };
}

// HANGMAN WORDS
const wordList = [
  'guitar',
  'oxygen',
  'mountain',
  'painting',
  'astronomy',
  'football',
  'chocolate',
  'butterfly',
  'history',
  'pizza',
  'jazz',
  'camera',
  'diamond',
  'adventure',
  'science',
  'bicycle',
  'sunset',
  'coffee',
  'dance',
  'galaxy',
  'orchestra',
  'volcano',
  'novel',
  'sculpture',
  'symphony',
  'architecture',
  'ballet',
  'astronaut',
  'waterfall',
  'technology',
  'rainbow',
  'universe',
  'piano',
  'vacation',
  'rainforest',
  'theater',
  'telephone',
  'language',
  'desert',
  'sunflower',
  'fantasy',
  'telescope',
  'breeze',
  'oasis',
  'photography',
  'safari',
  'planet',
  'river',
  'tropical',
  'mysterious',
  'enigma',
  'paradox',
  'puzzle',
  'whisper',
  'shadow',
  'secret',
  'curiosity',
  'unpredictable',
  'obfuscate',
  'unveil',
  'illusion',
  'moonlight',
  'vibrant',
  'nostalgia',
  'brilliant',
];

// FUNCTIONALITIES
const elements = createElements();
let currentWord = '';
let correctLetters = [];
let wrongGuessCount = 0;
const maxGuesses = 6;

function getRandomWord(wordDisplay) {
  const randomIndex = random(wordList.length, 0);
  const _word = wordList[randomIndex];
  const word = translate(_word);
  const hint = translate(_word + '_hint');
  currentWord = word;
  document.querySelector('.hint-display').innerHTML = hint;

  for (let i = 0; i < currentWord.length; i++) {
    const letterItem = document.createElement('li');
    letterItem.classList.add('letter');
    wordDisplay.appendChild(letterItem);
  }
}

function winScreen(hintCon, keyboard, gameplayCon) {
  hintCon.style.display = 'none';
  keyboard.style.display = 'none';
  const win = document.createElement('h3');
  gameplayCon.appendChild(win);
  return (win.textContent = `You're worthy! Here's your (insert item name)`);
}

function lossScreen(hintCon, wordDisplay, keyboard, guessDisplay, gameplayCon) {
  hintCon.style.display = 'none';
  wordDisplay.classList.add('hidden');
  keyboard.style.display = 'none';
  guessDisplay.style.display = 'none';
  const correctWord = document.createElement('h4');
  gameplayCon.appendChild(correctWord);
  const correctWordText = (correctWord.innerHTML = `Correct word: <br>${currentWord.toUpperCase()}</br>`);
  const loss = document.createElement('h5');
  gameplayCon.appendChild(loss);
  const lossText = (loss.textContent = `Not worthy! (insert item name) is gonna cost ya!`);

  return correctWordText && lossText;
}

const initGame = (
    button, clickedLetter, hintCon, keyboard, gameplayCon, hangmanImg,
    wordDisplay, guessDisplay) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  if (currentWord.length === correctLetters.length) return winScreen(hintCon,
      keyboard, gameplayCon);
  if (wrongGuessCount === maxGuesses) return lossScreen(hintCon,
      keyboard, gameplayCon, wordDisplay, guessDisplay);

  button.disabled = true;
  guessDisplay.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

// Creates keyboard buttons and adds eventlisteners to each of them
function createKeyboard(keyboard) {

// Creates keyboard buttons and adds eventlisteners to each of them
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener('click',
        (e) => initGame(e.target, String.fromCharCode(i),
            elements.hangmanImg, elements.guessDisplay, elements.wordDisplay,
            elements.hintCon, elements.keyboard, elements.gameplayCon));
  }
}

createKeyboard(elements.keyboard);
getRandomWord(elements.wordDisplay);
