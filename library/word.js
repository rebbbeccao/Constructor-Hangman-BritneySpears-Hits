var Letter = require('./letter.js');

// The Word constructor is responsible for creating an array of Letter objects 
// & determining if the user guessed every Letter correctly 
function Word(word) {
    // word.split - splits word into array of letters
    //.map - instantiate a new 'Letter' for each character & return an array
    console.log("word=" + word);
    this.letters = word.split("").map(function(char) { //??
        return new Letter(char);
        console.log("return new Letter(" + char +")"); //??
    });
}

// prototypes are optional, but will take up less memory than if we defined each method in the constructor as an instance method. 

// setting the method on the prototype means all instances of Word share this code
// but when it is called, "this" refers to that particular instance
Word.prototype.getSolution = function() {
    return this.letters.map(function(letter) { //iterate over each letter
        return letter.getSolution(); // return the solution for each to create an array of solved letters
    }).join(''); // create a string from the array of solved letters
}

// setting "toString" as a method lets us concatenate it like we would a string!
Word.prototype.toString = function() {
    return this.letters.join(' '); // see Letter.prototype.toString in letter.js
};

Word.prototype.guessLetter = function(char) {
    // Checks to see if any of the letters in the solved letter array 
    // match the user's guess, creates and updates "foundLetter"
    var foundLetter = false;
    this.letters.forEach(function(letter) {
        if (letter.guess(char)) {
            foundLetter = true;
        }
    });

    // Print the word guessed so far -- because we set the 
    //method for toString, Javascript will automatically concatenate this even if we dont call toString
    console.log('\n' + this + '\n');
    return foundLetter;
};

Word.prototype.guessedCorrectly = function() {
    return this.letters.every(function(letter) {
        return letter.visible;
    });
};

module.exports = Word;
