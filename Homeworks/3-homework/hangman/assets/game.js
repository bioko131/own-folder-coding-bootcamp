// I need a word bank (more than one word)

// I need a random word from that word bank

// I need a way to represent how many letters are in the word
	//displayWord = ["_", ...];
	//start wuth underscores
// I need to display this to the user

//TODO: keep track of guesses

// listen when they press a keey that is a letter
	//check to make sure it's a letter

	//is this letter in the word that we randomly guessed?
		//update the representation of how mnay letters are in the word





//Creating array of the words to be guessed
	var teamsToGuess =  ['Real Madrid'];


	 // 'Milan', 'Bayern Munich', 'Barcelona',
		// 			'Liverpool', 'Ajax', 'Internazionale', 'Manchester United',
		// 			'Juventus', 'Benfica', 'Nottingham Forest', 'Porto', 
		// 			'Celtic', 'Hamburg', 'Steaua Bucharest', 'Marseille',
		// 			'Borussia Dortmund', 'Chelsea', 'Feyenoord', 'Aston Villa',
		// 			'PSV Eindhoven', 'Red Star Belgrade'];


	var wordSelectedByComp = teamsToGuess[0];

	var wordBeingDisplayed = [];
	for (var i = 0; i < wordSelectedByComp.length; i++) {
		wordBeingDisplayed.push('_');
	}

	console.log(wordSelectedByComp);
	console.log(wordBeingDisplayed);   
	
  	document.getElementById("display-word").innerHTML = wordBeingDisplayed.join('  ');

// //Determining function for the user to use when choosing a 'Key'
// document.onekeyup = function () { //Am I going to use the event parameter here?
// 	teamsToGuess = String.fromCharCode(event.keyCode).toLowerCase();

// 	console.log(teamsToGuess);
// }



// //Determneing what to do when the userChoice is selected

// // 	var computerWord = options[Math.floor(Math.random()*options.length)];

// // 	console.log(computerWord);


// // }

// // Create a bank with the empty array to select and capture the array with the correct answers

// //for loops needed for... ???? 





// //Determining function for the user to use when choosing a 'Key'
// document.onekeyup = function () {
// 	userChoice = String.fromCharCode(event.keyCode).toLowerCase();

// 	console.log(userChoice);

// //Determneing what to do when the userChoice is selected

// 	var computerWord = options[Math.floor(Math.random()*options.length)];

// 	console.log(computerWord);


// }

// // Create a bank with the empty array to select and capture the array with the correct answers

// //for loops needed for... ???? 
