const words = [
  "chair",
  "youth",
  "couch",
  "freezer"
];

const word = words[Math.floor(Math.random() * words.length)];

const answerArray = [];

for (let i = 0; i < word.length; i++) {
  answerArray.push('_');
}

let remainingLetters = word.length;

while (remainingLetters > 0) {
  alert(answerArray.join(' '));

  const guess = prompt("Guess a letter, or click Cancel to stop playing.");
  if (guess === null) {
    break;
  } else if (guess.length !== 1) {
    alert("Please, enter a single letter");
  } else {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        answerArray[i] = guess;
        remainingLetters--;
      }
    }
  }
}

alert(answerArray.join(' '));
alert("Great job, the answer was " + word);
