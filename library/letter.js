function Letter(char) {
    // If a character is not a number or a letter, make it visible right away
    
    this.visible = !/[a-z1-9]/i.test(char);
    // Save the underlying character
    
    this.char = char;
    console.log("char= " + char);
};

//If chosen word contains any symbols/numbers display them 
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

Letter.prototype.guess = function(charGuess) {
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
        this.visible = true;
        return true;
    }
    return false;
};

module.exports = Letter;