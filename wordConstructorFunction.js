var Word {
    wordArray = ["Army", "Butterfly", "Cappuccino", "Diamond", "Earth", "Feather", "Gemstone", "Horoscope", "Ice", "Meteor", "Pyramid", "Rainbow"],
    function chooseWord() {
    var chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase();
    var letterArray = chosenWord.split("")
    console.log(letterArray);
}

}