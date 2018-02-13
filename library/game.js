var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./word");
// var words = require("./words");

function Game() {

    var self = this;

    this.play = function() {
        this.guessesLeft = 10;
        this.nextWord();
    };
//randWord is erroring as 'undefined'
    this.nextWord = function() {
        var wordBank = [
            "Lucky",
            "Baby One More Time",
            "Womanizer",
            "Til The World Ends",
            "Circus",
            "I Wanna Go",
            "Hold It Against Me",
            "Toxic",
            "Oops I Did It Again",
            "Gimme More",
            "You Drive Me Crazy",
            "Everytime",
            "If U Seek Amy",
            "Piece Of Me",
            "Sometimes",
            "Stronger"
        ];
        var randWord_int = Math.floor(Math.random() * wordBank.length);
        var randWord = wordBank[randWord_int];
        this.currentWord = new Word(randWord);
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
            var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
            console.log(didGuessCorrectly);
            if (didGuessCorrectly) {
                console.log(chalk.green("\nCORRECT!!!\n"));
            }
            else {
                self.guessesLeft--;
                console.log(chalk.red("\nINCORRECT!!!\n"));
                console.log(self.guessesLeft + " guesses remaining!!!");
            }
        });
    };

    this.quit = function() {
        console.log("\nGoodbye!");
        process.exit(0);
    };
};

module.exports = Game;

