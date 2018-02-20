var Letter = require('./letter.js');

function Word(word, char) {
    console.log("word=" + word);
    this.letters = word.split("").map(function(char) {
        return new Letter(char);
    });

}

Word.prototype.getSolution = function() {
    return this.letters.map(function(letter) {
        return letter.getSolution;
    }).join('');
}

Word.prototype.toString = function() {
    return this.letters.join(' ');
}

Word.prototype.guessLetter = function() {
    var foundLetter = false;
    this.letters.forEach(function(char) {
       console.log("letter = " + letter);
        if (letter.guess(char)) {
            foundLetter = true;
        }
    });
    console.log('\n' + this + '\n');
    return foundLetter;
};

Word.prototype.guessedCorrectly = function() {
    return this.letters.every(function(letter) {
        return letter.visible;
    });
};

module.exports = Word;
