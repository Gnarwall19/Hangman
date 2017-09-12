var word;		//represents word to be guessed
var guess;		//user guess
var counter;		//counts correct letters

var letters = [];		//correctly guessed letters
var wrongLetters = [];		//incorrectly guessed letters
var losses = 0;		//totall losses
var wins = 0;		//total wins

//Audio
var audio = new Audio("assets/audio/music.mp3");
var blaster = new Audio("assets/audio/blaster.mp3");
var vader = new Audio("assets/audio/father.mp3");
var r2d2 = new Audio("assets/audio/r2d2.mp3");

//displays wins and losses on page
document.getElementById("losses").innerHTML = losses;
document.getElementById("wins").innerHTML = wins;

//list of random words
var wordListA = ["alderaan", "asteroid", "coruscant", "dagobah", "hoth", "kashyyyk", "naboo", "tatooine", "droid", "atat", "blaster", 
"podracer", "sandcrawler", "clone", "luke", "leia", "vader", "biggs", "dooku", "dak", "emperor", "palpatine", "fin", "rey", "tarkin", 
"han", "chewbacca", "jabba", "greedo", "lando", "yoda", "padme", "maul", "wedge", "yoda", "bantha", "sarlacc", "wampa", "tauntaun", 
"wookie", "empire", "rebel", "light", "dark", "bowcaster", "phasma", "lightsaber"];

//changes words to all uppercase
var wordList = String.prototype.toUpperCase.apply(wordListA).split(",");

//randomly chooses a word from the array and replaces letters with underscores
function start() {
	word = wordList[Math.floor(Math.random() * wordList.length)];
	counter = 6;
	document.getElementById("counter").innerHTML = counter;
	for (i = 0; i < word.length; i++) {
		letters[i] = "__";
	}

	//blank word is displayed on page
	document.getElementById("answer").innerHTML = letters.join(" ");
	console.log(word);		//for cheating
}


//main game function
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

			//+1 to wins if word is guessed
			if (counter > 0 && letters.join("") === word) {
				document.getElementById("wins").innerHTML = wins + 1;
				console.log(wins);
				r2d2.play();
				confirm("YOU WIN! The word was " + word.toUpperCase() + " Play again?"); {
					//new round
					wins++;
					counter = 6;
					letters = [ ];
					wrongLetters = [ ];
					start();
				}
			}

			//+1 to losses if counter reaches 0
			else if (counter === 0) {
				document.getElementById("losses").innerHTML = losses + 1;
				console.log(losses);
				vader.play();
				confirm("YOU LOSE... The word was " + word.toUpperCase() + " play again?"); {
					//new round
					losses++;
					counter = 6;
					letters = [];
					wrongLetters = [];
					start();
				}
			}

			//adds new hangman image as for every incorrect guess/counter ticks down
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

//press any key to start function
function pressKey() {
	document.onkeyup = function(event) {
		document.getElementById("press-to-start").innerHTML = " ";
		counter = 6;
		start();
		Game();
	}
}

//calls pressKey function
pressKey();