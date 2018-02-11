// I began building the code to generate a random word from a word array for the player to 
// guess, and then splits the word into an array i = each character

var inquirer = require('inquirer')
var wordConstructorFunction = require('./wordConstructorFunction');

function initialize() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'gamestart',
            message: 'Would you like to start a new game?',
            choices: ['YES', 'NO']
        }
    ]).then(function(playerMove) {
        if (playerMove.gamestart === 'YES') {
            userGuess();
        }
    })
}

function userGuess() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'letterguess',
            message: 'Please guess a letter: '
        }
    ]).then(function(response) {
        var storedGuess = response.letterguess
        console.log(storedGuess);        
        })
}

initialize();
