var inquirer = require("inquirer");
var chalk = require("chalk");

var Game = function() {
    var self = this;

    this.play = function() {
        this.guessLeft = 10;
        this.nextWord();
    };

    this.nextWord = function() {
        var randWord = words[Math.floor(Math.random() * words.length)];
        this.currentWord = new Word(randword);
        console.log('\n' + this.currentWord + '\n');
        this.makeGuess();
    }

}

