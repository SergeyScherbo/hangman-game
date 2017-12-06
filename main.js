const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 5;

// amount of lives
let lives = 7;

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
const randomWord = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
}
