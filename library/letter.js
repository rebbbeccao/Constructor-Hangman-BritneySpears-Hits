// The letter constructor is responsible for displaying either
// an underscore or the underlying character for each letter in the word

function Letter(char) {
  // If a character is not a number or a letter, make it visible right away
  this.visible = !/[a-z1-9]/i.test(char);
  // Save the underlying character
  this.char = char;
  // console.log("char = " + char);
}

// Returns either an underscore or the underlying character depending on 'this.visible'
// Because we call this function toString, when we call "this.letters.join"
// in Word.js, Javascript will automatically use the value we return here.
Letter.prototype.toString = function() {
  if (this.visible === true) {
    // console.log('this.char = ' + this.char);
    return this.char;
  } // if no symbols/numbers are present return '_'
  return '_';
};

Letter.prototype.getSolution = function() {
  return this.char;
};

// Accepts a user's guess
Letter.prototype.guess = function(charGuess) {
  if (charGuess.toUpperCase() === this.char.toUpperCase()) {
    this.visible = true;
    return true;
  }
  return false;
};

module.exports = Letter;
