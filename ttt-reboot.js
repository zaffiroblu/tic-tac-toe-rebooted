// My first attempt at building a IIFE for the gameDisplay:
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

// factoryFunction for the two players
const playerFactory = (symbol) => {
	const makeMove = (arrayIndex) => {
		gameDisplay.tField[arrayIndex] = symbol;
		// + add an inactive class to the position!
	};
	return { symbol, makeMove };
};

//I create players as an array, like Roman did:
const playerArray = [playerFactory('X'), playerFactory('O')];

let turn;

// What I need (for instance): playerArray[1].makeMove(2)

const roundElements = (() => {
	//This sets the first turn value:
	function playerMove(gameArrayIndex) {
		if (turn) {
			playerArray[0].makeMove(gameArrayIndex);
		} else {
			playerArray[1].makeMove(gameArrayIndex);
		}
	}
	// This is the function to display the move on the board.
	const displayMove = (gameArrayIndex) => {
		//Now I the button that was clicked is disabled, so no other moves are allowed there.
		// const field0 = document.querySelector('#index-0');
		let fieldToDisplay = document.querySelector(`#index-${gameArrayIndex}`);
		fieldToDisplay.innerText = gameDisplay.tField[`${gameArrayIndex}`];
		fieldToDisplay.classList.add('disabled');
	};

	function checkForWin(tField, fieldIndex1, fieldIndex2, fieldIndex3) {
		if (
			gameDisplay.tField[fieldIndex1] !== '' &&
			gameDisplay.tField[fieldIndex2] !== '' &&
			gameDisplay.tField[fieldIndex3] !== ''
		) {
			if (
				gameDisplay.tField[fieldIndex1] ==
					gameDisplay.tField[fieldIndex2] &&
				gameDisplay.tField[fieldIndex2] ==
					gameDisplay.tField[fieldIndex3]
			) {
				gameDisplay.tMessage.innerText = `Player "${gameDisplay.tField[fieldIndex1]}" wins!`;
				return true;
			}
		}
	}

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
		return;
	}
	gameDisplay.tMessage.innerText = `${turn ? 'O' : 'X'}, make your move!`;
}

/// OLD CODE!

// gameArray[0] !== '' &&
// gameArray[1] !== '' &&
// gameArray[2] !== '' &&
// gameArray[3] !== '' &&
// gameArray[4] !== '' &&
// gameArray[5] !== '' &&
// gameArray[6] !== '' &&
// gameArray[7] !== '' &&
// gameArray[8] !== ''

// checkForWin(gameArray, 0, 1, 2);
// checkForWin(gameArray, 3, 4, 5);
// checkForWin(gameArray, 6, 7, 8);
// checkForWin(gameArray, 0, 3, 6);
// checkForWin(gameArray, 1, 4, 7);
// checkForWin(gameArray, 2, 5, 8);
// checkForWin(gameArray, 0, 4, 8);
// checkForWin(gameArray, 6, 4, 2);

// const field0 = document.querySelector('#index-0');
// field0.innerText = gameArray[0];
// const field1 = document.querySelector('#index-1');
// field1.innerText = gameArray[1];
// const field2 = document.querySelector('#index-2');
// field2.innerText = gameArray[2];
// const field3 = document.querySelector('#index-3');
// field3.innerText = gameArray[3];
// const field4 = document.querySelector('#index-4');
// field4.innerText = gameArray[4];
// const field5 = document.querySelector('#index-5');
// field5.innerText = gameArray[5];
// const field6 = document.querySelector('#index-6');
// field6.innerText = gameArray[6];
// const field7 = document.querySelector('#index-7');
// field7.innerText = gameArray[7];
// const field8 = document.querySelector('#index-8');
// field8.innerText = gameArray[8];

// function makeMove(arrayIndex, value) {
// 	gameArray[arrayIndex] = value;
// 	// + add an inactive class to the position!
// }

// alternateTurns(makeMove(4, 'o'));

// Potential series of events:
// makeMove(0, 'x');
// makeMove(4, 'o');
// makeMove(8, 'x');
// makeMove(2, 'o');
// makeMove(6, 'x');
// makeMove(3, 'o');
// makeMove(7, 'x');

// console.log(gameArray);
