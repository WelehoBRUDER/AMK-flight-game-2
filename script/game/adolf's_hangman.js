// ELEMENTS

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
hangmanTitle.innerHTML = `<p style="font-family: 'Courier New', sans-serif">Adolf's Hangman</p>`;
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

// Hint display
const hintDisplay = document.createElement('h2');
hintDisplay.classList.add('hint-display');
gameplayCon.appendChild(hintDisplay);

// Guesses display (Correct/Incorrect)
const guessDisplay = document.createElement('h2');
guessDisplay.classList.add('guess-display');
gameplayCon.appendChild(guessDisplay);

// Keyboard
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
gameplayCon.appendChild(keyboard);

// HANGMAN WORDS
const wordList = [
  {
    word: 'guitar',
    hint: 'A musical instrument with strings.',
  },
  {
    word: 'oxygen',
    hint: 'A colorless, odorless gas essential for life.',
  },
  {
    word: 'mountain',
    hint: 'A large natural elevation of the Earth\'s surface.',
  },
  {
    word: 'painting',
    hint: 'An art form using colors on a surface to create images or expression.',
  },
  {
    word: 'astronomy',
    hint: 'The scientific study of celestial objects and phenomena.',
  },
  {
    word: 'football',
    hint: 'A popular sport played with a spherical ball.',
  },
  {
    word: 'chocolate',
    hint: 'A sweet treat made from cocoa beans.',
  },
  {
    word: 'butterfly',
    hint: 'An insect with colorful wings and a slender body.',
  },
  {
    word: 'history',
    hint: 'The study of past events and human civilization.',
  },
  {
    word: 'pizza',
    hint: 'A savory dish consisting of a round, flattened base with toppings.',
  },
  {
    word: 'jazz',
    hint: 'A genre of music characterized by improvisation and syncopation.',
  },
  {
    word: 'camera',
    hint: 'A device used to capture and record images or videos.',
  },
  {
    word: 'diamond',
    hint: 'A precious gemstone known for its brilliance and hardness.',
  },
  {
    word: 'adventure',
    hint: 'An exciting or daring experience.',
  },
  {
    word: 'science',
    hint: 'The systematic study of the structure and behavior of the physical and natural world.',
  },
  {
    word: 'bicycle',
    hint: 'A human-powered vehicle with two wheels.',
  },
  {
    word: 'sunset',
    hint: 'The daily disappearance of the sun below the horizon.',
  },
  {
    word: 'coffee',
    hint: 'A popular caffeinated beverage made from roasted coffee beans.',
  },
  {
    word: 'dance',
    hint: 'A rhythmic movement of the body often performed to music.',
  },
  {
    word: 'galaxy',
    hint: 'A vast system of stars, gas, and dust held together by gravity.',
  },
  {
    word: 'orchestra',
    hint: 'A large ensemble of musicians playing various instruments.',
  },
  {
    word: 'volcano',
    hint: 'A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected.',
  },
  {
    word: 'novel',
    hint: 'A long work of fiction, typically with a complex plot and characters.',
  },
  {
    word: 'sculpture',
    hint: 'A three-dimensional art form created by shaping or combining materials.',
  },
  {
    word: 'symphony',
    hint: 'A long musical composition for a full orchestra, typically in multiple movements.',
  },
  {
    word: 'architecture',
    hint: 'The art and science of designing and constructing buildings.',
  },
  {
    word: 'ballet',
    hint: 'A classical dance form characterized by precise and graceful movements.',
  },
  {
    word: 'astronaut',
    hint: 'A person trained to travel and work in space.',
  },
  {
    word: 'waterfall',
    hint: 'A cascade of water falling from a height.',
  },
  {
    word: 'technology',
    hint: 'The application of scientific knowledge for practical purposes.',
  },
  {
    word: 'rainbow',
    hint: 'A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.',
  },
  {
    word: 'universe',
    hint: 'All existing matter, space, and time as a whole.',
  },
  {
    word: 'piano',
    hint: 'A musical instrument played by pressing keys that cause hammers to strike strings.',
  },
  {
    word: 'vacation',
    hint: 'A period of time devoted to pleasure, rest, or relaxation.',
  },
  {
    word: 'rainforest',
    hint: 'A dense forest characterized by high rainfall and biodiversity.',
  },
  {
    word: 'theater',
    hint: 'A building or outdoor area in which plays, movies, or other performances are staged.',
  },
  {
    word: 'telephone',
    hint: 'A device used to transmit sound over long distances.',
  },
  {
    word: 'language',
    hint: 'A system of communication consisting of words, gestures, and syntax.',
  },
  {
    word: 'desert',
    hint: 'A barren or arid land with little or no precipitation.',
  },
  {
    word: 'sunflower',
    hint: 'A tall plant with a large yellow flower head.',
  },
  {
    word: 'fantasy',
    hint: 'A genre of imaginative fiction involving magic and supernatural elements.',
  },
  {
    word: 'telescope',
    hint: 'An optical instrument used to view distant objects in space.',
  },
  {
    word: 'breeze',
    hint: 'A gentle wind.',
  },
  {
    word: 'oasis',
    hint: 'A fertile spot in a desert where water is found.',
  },
  {
    word: 'photography',
    hint: 'The art, process, or practice of creating images by recording light or other electromagnetic radiation.',
  },
  {
    word: 'safari',
    hint: 'An expedition or journey, typically to observe wildlife in their natural habitat.',
  },
  {
    word: 'planet',
    hint: 'A celestial body that orbits a star and does not produce light of its own.',
  },
  {
    word: 'river',
    hint: 'A large natural stream of water flowing in a channel to the sea, a lake, or another such stream.',
  },
  {
    word: 'tropical',
    hint: 'Relating to or situated in the region between the Tropic of Cancer and the Tropic of Capricorn.',
  },
  {
    word: 'mysterious',
    hint: 'Difficult or impossible to understand, explain, or identify.',
  },
  {
    word: 'enigma',
    hint: 'Something that is mysterious, puzzling, or difficult to understand.',
  },
  {
    word: 'paradox',
    hint: 'A statement or situation that contradicts itself or defies intuition.',
  },
  {
    word: 'puzzle',
    hint: 'A game, toy, or problem designed to test ingenuity or knowledge.',
  },
  {
    word: 'whisper',
    hint: 'To speak very softly or quietly, often in a secretive manner.',
  },
  {
    word: 'shadow',
    hint: 'A dark area or shape produced by an object blocking the light.',
  },
  {
    word: 'secret',
    hint: 'Something kept hidden or unknown to others.',
  },
  {
    word: 'curiosity',
    hint: 'A strong desire to know or learn something.',
  },
  {
    word: 'unpredictable',
    hint: 'Not able to be foreseen or known beforehand; uncertain.',
  },
  {
    word: 'obfuscate',
    hint: 'To confuse or bewilder someone; to make something unclear or difficult to understand.',
  },
  {
    word: 'unveil',
    hint: 'To make known or reveal something previously secret or unknown.',
  },
  {
    word: 'illusion',
    hint: 'A false perception or belief; a deceptive appearance or impression.',
  },
  {
    word: 'moonlight',
    hint: 'The light from the moon.',
  },
  {
    word: 'vibrant',
    hint: 'Full of energy, brightness, and life.',
  },
  {
    word: 'nostalgia',
    hint: 'A sentimental longing or wistful affection for the past.',
  },
  {
    word: 'brilliant',
    hint: 'Exceptionally clever, talented, or impressive.',
  },
];

// FUNCTIONALITIES
let currentWord = '';
let correctLetters = [];
let wrongGuessCount = 0;
const maxGuesses = 6;

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const {word, hint} = wordList[randomIndex];
  currentWord = word;
  document.querySelector('.hint-display').innerHTML = hint;

  for (let i = 0; i < currentWord.length; i++) {
    const letterItem = document.createElement('li');
    letterItem.classList.add('letter');
    wordDisplay.appendChild(letterItem);
  }
}

function winScreen() {
  hintDisplay.style.display = 'none';
  keyboard.style.display = 'none';
  const win = document.createElement('h3');
  gameplayCon.appendChild(win);
  return win.textContent = `You're worthy! Here's your (insert item name)`;
}

function lossScreen() {
  hintDisplay.style.display = 'none';
  wordDisplay.classList.add('hidden');
  keyboard.style.display = 'none';
  guessDisplay.style.display = 'none'
  const correctWord = document.createElement('h4')
  gameplayCon.appendChild(correctWord)
  const correctWordText = correctWord.innerHTML = `Correct word: <br>${currentWord.toUpperCase()}</br>`
  const loss = document.createElement('h5');
  gameplayCon.appendChild(loss);
  const lossText = loss.textContent = `Not worthy! (insert item name) is gonna cost ya!`


  return correctWordText && lossText
}

const initGame = (button, clickedLetter) => {
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
  if (currentWord.length === correctLetters.length) return winScreen();
  if (wrongGuessCount === maxGuesses) return lossScreen();

  button.disabled = true;
  guessDisplay.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

// Creates keyboard buttons and adds eventlisteners to each of them
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener('click',
      (e) =>
          initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
