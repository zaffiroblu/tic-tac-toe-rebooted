// Welcome! Here's my first attempt at building a IIFE for the gameDisplay, and
// for trying to go about things in an object-oriented manner.

const gameDisplay = (() => {
	const tField = ['', '', '', '', '', '', '', '', ''];
	const tMessage = document.querySelector('.game-message-display');
	const tMessage2 = document.querySelector('.game-message-display2');
	// const div = (a, b) => a / b;
	return {
		tField,
		tMessage,
		tMessage2,
	};
})();

// This sets up the game -- a few things are in the global scope:
let turn;
gameDisplay.tMessage.innerText = "Hey player X! You're up first.";

// factoryFunction for the two players
const playerFactory = (symbol) => {
	const makeMove = (arrayIndex) => {
		gameDisplay.tField[arrayIndex] = symbol;
	};
	return { symbol, makeMove };
};

//I create players as an array:
const playerArray = [playerFactory('X'), playerFactory('O')];

// Here we go with another IIFE!
const roundElements = (() => {
	// This sets the first turn value:
	function playerMove(gameArrayIndex) {
		if (turn) {
			playerArray[0].makeMove(gameArrayIndex);
		} else {
			playerArray[1].makeMove(gameArrayIndex);
		}
	}

	// This is the function to display the move on the board.
	const displayMove = (gameArrayIndex) => {
		let fieldToDisplay = document.querySelector(`#index-${gameArrayIndex}`);
		fieldToDisplay.innerText = gameDisplay.tField[`${gameArrayIndex}`];
		// Now the button that was clicked is disabled, so no other moves are allowed there.
		fieldToDisplay.classList.add('disabled');
	};

	// This function checks for a win at every turn:
	function checkForWin(location, fieldIndex1, fieldIndex2, fieldIndex3) {
		if (
			location[fieldIndex1] !== '' &&
			location[fieldIndex2] !== '' &&
			location[fieldIndex3] !== ''
		) {
			if (
				gameDisplay.tField[fieldIndex1] ==
					gameDisplay.tField[fieldIndex2] &&
				gameDisplay.tField[fieldIndex2] ==
					gameDisplay.tField[fieldIndex3]
			) {
				gameDisplay.tMessage.innerText = `Player ${gameDisplay.tField[fieldIndex1]} wins!`;
				return true;
			}
		}
	}

	// This function checks to see if the game is a draw:
	function checkForDraw() {
		const isNotEmpty = (currentValue) => currentValue !== '';
		if (gameDisplay.tField.every(isNotEmpty)) {
			gameDisplay.tMessage.innerText = 'This game is a draw!';
			return true;
		}
		return false;
	}

	function alternateTurns() {
		if (turn) {
			turn = !turn;
		} else {
			turn = true;
		}
	}

	return {
		playerMove,
		displayMove,
		checkForWin,
		checkForDraw,
		alternateTurns,
	};
})();
// WOW! That was satisfying. :-)

// Here is a normal function that is triggered each time
// a player clicks/taps a game field in the UI:
function ticTacToe(gameArrayIndex) {
	// My idea for turns: I have a function that alternates turns at this point:
	roundElements.alternateTurns();
	roundElements.playerMove(gameArrayIndex);
	roundElements.displayMove(gameArrayIndex);

	if (
		roundElements.checkForWin(gameDisplay.tField, 0, 1, 2) ||
		roundElements.checkForWin(gameDisplay.tField, 3, 4, 5) ||
		roundElements.checkForWin(gameDisplay.tField, 6, 7, 8) ||
		roundElements.checkForWin(gameDisplay.tField, 0, 3, 6) ||
		roundElements.checkForWin(gameDisplay.tField, 1, 4, 7) ||
		roundElements.checkForWin(gameDisplay.tField, 2, 5, 8) ||
		roundElements.checkForWin(gameDisplay.tField, 0, 4, 8) ||
		roundElements.checkForWin(gameDisplay.tField, 6, 4, 2) ||
		roundElements.checkForDraw()
	) {
		// This disables all fields at the end of the game.
		let allFields = document.querySelectorAll('.game-field');
		allFields.forEach((field) => {
			field.classList.add('disabled');
		});
		gameDisplay.tMessage2.classList.remove('d-none');
		return;
	}
	gameDisplay.tMessage.innerText = `${turn ? 'O' : 'X'}, make your move!`;
}
