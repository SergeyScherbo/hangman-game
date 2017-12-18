const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvWidth = canvas.width;
const canvHeight = canvas.height;
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

// finish game btn
const endGameBtn = document.querySelector('.endgame');

// shadow and modal
const shadow = document.querySelector('.general-shadow');
const modal = document.querySelector('.general-modal');
const endGameModal = document.querySelector('.endgame-modal');
const modalCloseBtn = document.querySelector('.modal__btn_end');

// current guess
let guess;

// blankss
let blanks;

// word
let randomWord;

// amount of lives
let lifes = 7;

// variable to track programm state
let isPlaying = false;

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
  if(isPlaying) {
    openModal('playing');
    return;
  }
  isPlaying = true;
  // choose random word
  randomWord = pickWord(words);

  // create blanks on the page, based on random word;
  blanks = makeBlanks(randomWord);

  endGameBtn.classList.remove('hide');
};

// function to make a guess
const makeGuess = () => {
  if (!isPlaying) {
    openModal('notPlaying');
    return;
  }

  guess = guessField.value;
  const guessRegex = /[^a-z]/gi;

  if(guess.length > 1) {
    openModal('singleLetter');
  } else if (guess.length === 0) {
    openModal('emptyGuess');
  } else if (guess.match(guessRegex) !== null) {
    openModal('notLetter');
  } else {
    compare(guess, randomWord);
  }
};

const compare = (guess, word) => {
  if(word.indexOf(guess) !== -1) {
    word = Array.from(word);
    word.map(function(val, i) {
      if (val === guess) {
        if(blanks[i].textContent.length > 0) {
          openModal('guess');
          return;
        }
        blanks[i].textContent = val;
      }
    })
  } else {
    const curLifeElement = lifesList.querySelector(`.lifes__el:nth-last-of-type(${lifes})`);
    curLifeElement.classList.add('lost');

    drawHangman(lifes);
    lifes--;
  }

  guessField.value = "";
  guessField.focus();

  checkState();
};

const endGame = () => {
  isPlaying = false;
  lifes = 7;

  // remove class 'lost' for each life element
  const lifesListEl = lifesList.querySelectorAll('.lifes__el');
  lifesListEl.forEach(life => life.classList.remove('lost'));

  // remove all blanks
  for (let i = 0; i < randomWord.length; i++) {
    result.removeChild(result.lastChild);
  }

  // clear the canvas
  ctx.clearRect(0, 0, canvWidth, canvHeight);

  endGameBtn.classList.add('hide');
  return;
}

const checkState = () => {
  if(lifes < 1) {
    openModal('lose');
    endGame();
  }

  let isEverythingFilled = Array.from(blanks).every(blank => blank.textContent.length > 0);

  if(isEverythingFilled) {
    openModal('win');
    endGame();
  }
};

const closeModal = function(e) {
  if(e.target.classList.contains('close')) {
    this.classList.add('hide-modal');
  }
};

const openModal = function(type) {
  let modalHead = document.querySelector('.modal__head h3');
  let modalBody = document.querySelector('.modal__body p');

  const randomModalHead = [
    'Oops',
    'OMG!',
    'Damn...',
    'Oh, come on',
    'Jeez',
    'Whoopsie'
  ];

  let rnd = randomModalHead[Math.floor(Math.random() * randomModalHead.length)];

  switch(type) {
    case 'playing':
      modalHead.textContent = rnd;
      modalBody.textContent = 'You already playing, please guess current word first';
      break;

    case 'notPlaying':
      modalHead.textContent = rnd;
      modalBody.textContent = 'You didn\'t start the game yet!';
      break;

    case 'singleLetter':
      modalHead.textContent = rnd;
      modalBody.textContent = 'Please, enter only one letter';
      break;

    case 'emptyGuess':
      modalHead.textContent = rnd;
      modalBody.textContent = 'You should enter something!';
      break;

    case 'notLetter':
      modalHead.textContent = rnd;
      modalBody.textContent = 'You can\'t enter non-letter symbols';
      break;

    case 'guess':
      modalHead.textContent = rnd;
      modalBody.textContent = `You already guessed "${guess}" letter`;
      break;

    case 'lose':
      modalHead.textContent = 'Better luck next time!'
      modalBody.textContent = `You lost. The word was "${randomWord}"`;
      break;

    case 'win':
      modalHead.textContent = 'Congratulations!';
      modalBody.textContent = `You guessed the word "${randomWord}"`;
      break;
  };

  shadow.classList.remove('hide-modal');
}

const endGameConfirm = function(e) {
  endGameModal.classList.remove('hide-modal');
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
endGameBtn.addEventListener('click', endGameConfirm);
shadow.addEventListener('click', closeModal);
