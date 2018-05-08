var inquirer = require('inquirer');
var chalk = require('chalk');
var Word = require('./word');

// Game constructor is responsible for keeping score
// & controlling the flow of the overall game

function Game() {
  // Saved as reference because 'this' will change in Inquirer
  var self = this;
  var round = 1;
  // Sets # guesses remaining and gets next word
  this.play = function() {
    //count rounds?
    this.guessesLeft = 10;
    this.nextWord();
  };

  // Creates a new Word object using a random word from the array
  this.nextWord = function() {
    var wordBank = [
      'Lucky',
      'Baby One More Time',
      'Womanizer',
      'Til The World Ends',
      'Circus',
      'I Wanna Go',
      'Hold It Against Me',
      'Toxic',
      'Oops I Did It Again',
      'Gimme More',
      'You Drive Me Crazy',
      'Everytime',
      'If U Seek Amy',
      'Piece Of Me',
      'Sometimes',
      'Stronger'
    ];
    var randWord_int = Math.floor(Math.random() * wordBank.length);
    var randWord = wordBank[randWord_int];
    this.currentWord = new Word(randWord);
    console.log(chalk.blue('\n' + this.currentWord + '\n'));
    // Asks user for their guess
    this.makeGuess();
  };

  // Uses Inquirer to prompt the user for their guess
  this.makeGuess = function() {
    this.askLetter().then(function() {
      // If the user has no guesses left after this guess,
      // show them the word & ask if they want to play again
      if (self.guessesLeft < 1) {
        console.log(
          'No guesses remaining! Word to guess was: ' +
            self.currentWord.getSolution() +
            '\n'
        );
        self.playAgain();
        // If user guessed all of the letters correctly, reset guessesLeft
        // & get the next word
      } else if (self.currentWord.guessedCorrectly()) {
        console.log('You got it right! Next word...');
        self.guessesLeft = 10;
        self.nextWord();
        // Otherwise prompt the user to guess the next letter
      } else {
        self.makeGuess();
      }
    });
  };

  // Asks the user if they want to playa again after running out of guessesLeft
  this.playAgain = function() {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'choice',
          message: 'Play Again?'
        }
      ])
      .then(function(val) {
        if (val.choice) {
          self.play();
        } else {
          self.quit();
        }
      });
  };

  // Prompts the user for a letter
  this.askLetter = function() {
    console.log(chalk.magenta('Javascript Hangman ~ Britney Spears Addition'));
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'choice',
          message: 'Guess a letter!',
          validate: function(val) {
            return /[a-z1-9]/gi.test(val);
            //   console.log("val= " + val);
          }
        }
      ])
      .then(function(val) {
        // If the user's guess is in the current word, log that they chose correctly
        var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
        // console.log('didGuessCorrectly= ' + didGuessCorrectly);
        if (didGuessCorrectly) {
          console.log(chalk.cyan('\nCORRECT!!!\n'));

          // Oherwise decrement "guessesLeft", and let the user know how many
          // guesses they have left
        } else {
          self.guessesLeft--;
          console.log(chalk.red('\nINCORRECT!!!\n'));
          console.log(self.guessesLeft + ' guesses remaining!!!');
        }
      });
  };

  this.quit = function() {
    console.log('\nGoodbye!');
    process.exit(0);
  };
}

module.exports = Game;
