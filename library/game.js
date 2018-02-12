var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./word");
var words = require("./words");

function Game() {

    var self = this;

    this.play = function() {
        this.guessesLeft = 10;
        this.nextWord();
    };

    this.nextWord = function() {
        var randWord = words[Math.floor(Math.random() * words.length)];
        this.currentWord = new Word(randword);
        console.log('\n' + this.currentWord + '\n');
        this.makeGuess();
    };

    this.makeGuess = function() {
        this.askLetter().then(function() {
            if (self.guessesLeft < 1) {
                console.log('No guesses remaining! Word to guess was: ' + self.currentWord.getSolution() + '\n');
                self.playAgain();
            }
            else if (self.currentWord.guessedCorrectly()) {
                console.log("You got it right! Next word...");
                self.guessesLeft = 10;
                self.nextWord();
            } 
            else {
                self.makeGuess();
            }
        });
    }

    this.playAgain = function() {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'choice',
                message: 'Play Again?'
            }
        ])
        .then(function(val) {
            if (val.choice) {
                self.play();
            }
            else {
                self.quit();
            }
        });
    };

    this.askLetter = function() {
        return inquirer.prompt([
            {
                type: "input",
                name: "choice",
                message: "Guess a letter!",
                validate: function(val) {
                    return /[a-z1-9]/gi.test(val);
                }
            }
        ])
        .then(function(val) {
            
        })
    }
}

