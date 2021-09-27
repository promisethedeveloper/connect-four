/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	// returns an array with its length property, set to the value of HEIGHT, and the array elements are empty(null) slots

	for (let y = 0; y < HEIGHT; y++) {
		const row = [];
		for (let x = 0; x < WIDTH; x++) {
			row.push(null);
		}
		board.push(row);
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector("#board");
	// TODO: add comment for this code
	// creates a table row
	const top = document.createElement("tr");
	// sets the id of the created row to "column-top"
	top.setAttribute("id", "column-top");
	// adds a click event listener to the created table row
	top.addEventListener("click", handleClick);
	// loops through, using the value of WIDTH as counter
	for (let x = 0; x < WIDTH; x++) {
		// creates table data
		const headCell = document.createElement("td");
		// sets the id of each to "x", which is the index number of the loop
		headCell.setAttribute("id", x);
		// appends the created table datas to the table row
		top.append(headCell);
	}
	// appends the table row and table datas to the table element
	htmlBoard.append(top);

	// TODO: add comment for this code
	// loops through, using the value of HEIGHT as counter
	for (let y = 0; y < HEIGHT; y++) {
		// creates a table row
		const row = document.createElement("tr");
		// loops through, using the value of width as counter
		for (let x = 0; x < WIDTH; x++) {
			// creates a table data, called cell
			const cell = document.createElement("td");
			// for each created cell, set the id to be the index of height and width
			// starting from "0-0" to "0-1"...until we get to "5-6"
			cell.setAttribute("id", `${y}-${x}`);
			// appends the cell and their ids to the table row
			row.append(cell);
		}
		// appends the table rows to the table element
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	// return 0;
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (board[y][x] === null) {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const div = document.createElement("div");
	// adds a class of piece to the created div
	div.classList.add("piece");
	// adds a class for whether the current player is 1 or 2 i.e p1 or p2
	div.classList.add(`p${currPlayer}`);

	// div.style.top = -50 * (y + 2);

	// selects td cells using their ids
	const spot = document.getElementById(`${y}-${x}`);

	// appends the created div into the correct td cell
	spot.append(div);
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
	alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);

	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	// updates the board variable with the current player number
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (checkForTie()) {
		return endGame("Tie!");
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2
	if (currPlayer === 1) {
		currPlayer = 2;
	} else {
		currPlayer = 1;
	}
}

function checkForTie() {
	let result = true;
	for (let y of board) {
		for (let x of y) {
			if (x === null) {
				result = false;
				break;
			}
		}
	}
	return result;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			([y, x]) =>
				y >= 0 &&
				y < HEIGHT &&
				x >= 0 &&
				x < WIDTH &&
				board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			let vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			let diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			let diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
