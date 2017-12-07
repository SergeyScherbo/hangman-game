const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 5;

// our list of letters
const result = document.querySelector('.result');

// button to make a guess
const guessBtn = document.querySelector('.input__btn');

// field to make a guess
const guessField = document.querySelector('.input__field');

// displayed lives
const lifesList = document.querySelector('.lifes');

// new game btn
const gameBtn = document.querySelector('.newgame');

// current guess
let guess;

// blankss
let blanks;

// word
let randomWord;

// amount of lives
let lifes = 7;

// variable to track programm state
let isPlaying = true; // for now I make true, so the game will start as soon as page loads

const words = [
  "bycicle",
  "earth",
  "javascript",
  "winter",
  "christmas",
  "tesla",
  "computer",
  "japan"
];

// function to choose random word
const pickWord = (arr) => arr[Math.floor(Math.random() * arr.length)];

const makeBlanks = (str) => {
  // we get our word variable and create blank for each letter and add it to the page;
  for (let i = 0; i < str.length; i++) {
    result.innerHTML += `<li></li>`;
  }

  return document.querySelectorAll('.result li');
};

const startGame = () => {
  // choose random word
  randomWord = pickWord(words);

  // create blanks on the page, based on random word;
  blanks = makeBlanks(randomWord);
}

// function to make a g
const makeGuess = () => {
  updateGuess();
  if(guess.length > 1) {
    alert('Please, enter only one letter');
  } else if (guess.length === 0) {
    alert('You should enter something');
  } else {
    compare(guess, randomWord);
  }
}

const updateGuess = () => {
  guess = guessField.value;
}

const compare = (guess, word) => {
  if(word.indexOf(guess) !== -1) {
    console.log('You guessed one or more letter!');
    word = Array.from(word);
    word.map(function(val, i) {
      if (val === guess) {
        blanks[i].textContent = val;
      }
    })
  } else {
    const lastLifeElement = lifesList.querySelector('.lifes__el:last-of-type');
    drawHangman(lifes);
    console.log('sorry, your guess is wrong...');
    lifes--;
    lifesList.removeChild(lastLifeElement);
  }
}

const drawHangman = (lives) => {
  switch(lives) {
    case 7:
      ctx.beginPath();
      ctx.moveTo(50, 350);
      ctx.lineTo(50, 50);
      ctx.lineTo(150, 50);
      ctx.lineTo(150, 100);
      ctx.stroke();
      break;

    case 6:
      ctx.beginPath();
      ctx.arc(150, 125, 25, 0, Math.PI * 2, false);
      ctx.stroke();
      break;

    case 5:
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineTo(150, 250);
      ctx.stroke();
      break;

    case 4:
      ctx.beginPath();
      ctx.moveTo(150, 250);
      ctx.lineTo(110, 330);
      ctx.stroke();
      break;

    case 3:
      ctx.beginPath();
      ctx.moveTo(150, 250);
      ctx.lineTo(190, 330);
      ctx.stroke();
      break;

    case 2:
      ctx.beginPath();
      ctx.moveTo(150, 170);
      ctx.lineTo(110, 250);
      ctx.stroke();
      break;

    case 1:
      ctx.beginPath();
      ctx.moveTo(150, 170);
      ctx.lineTo(190, 250);
      ctx.stroke();
      break;
  }
};

gameBtn.addEventListener('click', startGame);
guessBtn.addEventListener('click', makeGuess);
