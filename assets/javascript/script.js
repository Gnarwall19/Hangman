var word;

var guess;		//user guess
var letters = [];		//correctly guessed letters
var wrongLetters = [];		//incorrectly guessed letters
var counter;		//counts correct letters
var losses = 0;
var wins = 0;
var audio = new Audio("assets/audio/music.mp3");
var blaster = new Audio("assets/audio/blaster.mp3");
var vader = new Audio("assets/audio/father.mp3");
var r2d2 = new Audio("assets/audio/r2d2.mp3");



document.getElementById("losses").innerHTML = losses;
document.getElementById("wins").innerHTML = wins;

var wordListA = ["alderaan", "asteroid", "coruscant", "dagobah", "hoth", "kashyyyk", "naboo", "tatooine", "droid", "atat", "blaster", 
"podracer", "sandcrawler", "clone", "luke", "leia", "vader", "biggs", "dooku", "dak", "emperor", "palpatine", "fin", "rey", "tarkin", 
"han", "chewbacca", "jabba", "greedo", "lando", "yoda", "padme", "maul", "wedge", "yoda", "bantha", "sarlacc", "wampa", "tauntaun", 
"wookie", "empire", "rebel", "light", "dark", "bowcaster", "phasma", "lightsaber"];

var wordList = String.prototype.toUpperCase.apply(wordListA).split(","); //TRYING TO MAKE LIST UPPERCASE

//randomly chooses a word from the array and replaces letters with underscores
function start() {
	word = wordList[Math.floor(Math.random() * wordList.length)];
	counter = 6;
	document.getElementById("counter").innerHTML = counter;
	for (i = 0; i < word.length; i++) {
		letters[i] = "__";
	}

	document.getElementById("answer").innerHTML = letters.join(" ");
	console.log(word);


}


//checks if letter is in the word or not
function Game() {
	audio.play();

	document.onkeyup = function(event) {
		if (!(event.which <= 90 && event.which >= 65)) return
		guess = event.key.toUpperCase();
		var found = false;
		var hangmanPicture = document.getElementById("HangmanImg");
		console.log(found);
		for (i = 0; i < word.length; i++) {
			if (guess === word[i]) {
				letters[i] = guess;
				document.getElementById("answer").innerHTML = letters.join(" ");
				found = true;
			} 
		}
		//wrong letters go into the wrongLetters array and are displayed
		if (found && letters.join("") !== word) return;
		if (wrongLetters.indexOf(guess) < 0) {
			wrongLetters.push(guess);
			document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
			//every wrong guess subtracts one from the counter
			blaster.play();
			counter--;
			console.log(counter);
			document.getElementById("counter").innerHTML = counter;
			//when counter reaches 0 it's Game Over
			//+1 to the losses if 6 words are missed
			
			if (counter > 0 && letters.join("") === word) {				//THE ISSUE
				document.getElementById("wins").innerHTML = wins + 1;
				console.log(wins);
				r2d2.play();
				confirm("YOU WIN! The word was " + word.toUpperCase() + " Play again?");
				wins++;
				counter = 6;
				letters = [ ];
				wrongLetters = [ ];
				start();
			}

			else if (counter === 0) {
				document.getElementById("losses").innerHTML = losses + 1;
				console.log(losses);
				vader.play();
				confirm("YOU LOSE... The word was " + word.toUpperCase() + " play again?"); {
					losses++;
					counter = 6;
					letters = [];
					wrongLetters = [];
					start();
				}
			}


			if (counter == 6) {
				hangmanPicture.src = "assets/images/1.png";
			}
			else if (counter == 5) {
				hangmanPicture.src = "assets/images/2.png";
			}
			else if (counter == 4) {
				hangmanPicture.src = "assets/images/3.png";
			}
			else if (counter == 3) {
				hangmanPicture.src = "assets/images/4.png";
			}
			else if (counter == 2) {
				hangmanPicture.src = "assets/images/5.png";
			}
			else if (counter == 1) {
				hangmanPicture.src = "assets/images/6.png";
			}
			else if (counter == 0) {
				hangmanPicture.src = "assets/images/7.png";
			}


		}
	}
}

function pressKey() {
	document.onkeyup = function(event) {
		document.getElementById("press-to-start").innerHTML = " ";
		counter = 6;
		start();
		Game();
	}
}


pressKey();