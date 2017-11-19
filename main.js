// const words = [
//   "chair",
//   "youth",
//   "couch",
//   "freezer",
//   "javascript",
//   "sandwitch",
//   "winter",
//   "apple",
//   "juice"
// ];
//
// const word = words[Math.floor(Math.random() * words.length)];
//
// const answerArray = [];
//
// for (let i = 0; i < word.length; i++) {
//   answerArray.push('_');
// }
//
// ['_', '_', '_', 'l', '_']
//
// let remainingLetters = word.length;
//
// while (remainingLetters > 0) {
//   alert(answerArray.join(' '));
//
//   const guess = prompt("Guess a letter, or click Cancel to stop playing.");
//   if (guess === null) {
//     break;
//   } else if (guess.length !== 1) {
//     alert("Please, enter a single letter");
//   } else {
//     for (let i = 0; i < word.length; i += 1) {
//       if (word[i] === guess.toLowerCase()) {
//         if (answerArray[i] !== '_') {
//           alert('You already guessed ' + answerArray[i] + ' letter!');
//           break;
//         }
//
//         answerArray[i] = guess;
//         remainingLetters--;
//       }
//     }
//   }
// }
//
// alert(answerArray.join(' '));
// alert("Great job, the answer was " + word);


function validatePIN (pin) {
  //return true or false
  for (let i = 0; i < pin.length; i++) {
    if (Number(pin[i]) === NaN) {
      return false;
    }
  }
  if (pin.length === 4 || pin.length === 6) {


    return true;
  } else {
    return false;
  }
}
