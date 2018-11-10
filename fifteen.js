/*
	Populates the puzzle board with puzzle pieces and allows the user to play the
	fifteen puzzle game. It enables shuffling of the puzzle board and 
	responds to the users input.
*/

 "use strict";
 (function() {
 	let leftPositions = [0, 100, 200, 300,
 						 0, 100, 200, 300, 
 						 0, 100, 200, 300, 
 						 0, 100, 200, 300];
 	let topPositions =  [0, 0, 0, 0,
 						 100, 100, 100, 100,
 						 200, 200, 200, 200,
 						 300, 300, 300, 300];
 	let blankX; //column of blank square
 	let blankY; //row of blank square

 	window.onload = function() {
 		createPuzzle();
 		$("shuffle-button").onclick = shuffle;
 		$("copyright-info").innerHTML = "&copy;2017 by Jay Deshpande";
 	};

 	/**
 	* Creates 15 puzzle pieces and aligns them in pre-shuffle position
 	*/
 	function createPuzzle() {
 		blankX = 3;
 		blankY = 3;
 		let puzzleBoard = $("puzzle-area");
 		for (let i = 0; i < 15; i++) {
 			let newPiece = document.createElement("div");
 			let newPara = document.createElement("p");
 			let pieceNumber = document.createTextNode(i + 1);
 			newPara.appendChild(pieceNumber);
 			newPiece.appendChild(newPara);
 			newPiece.setAttribute("class", "puzzle-piece");
 			let x = i % 4;
 			let y = parseInt(i / 4);
 			newPiece.setAttribute("id", idFromXY(x, y));
 			newPiece.onmouseover = function() { 
 				highlightPiece(this); 
 			};
 			newPiece.onmouseout = function() { 
 				unHighlightPiece(this); 
 			};
 			newPiece.onclick = function() {
 				movePiece(this);
 			};
 			puzzleBoard.appendChild(newPiece);
 			newPiece.style.left = leftPositions[i] + "px";
 			newPiece.style.top = topPositions[i] + "px";
 			newPiece.style.backgroundImage = "url('background.jpg')";
 			let leftPos = -1 * leftPositions[i] + 'px';
 			let rightPos = -1 * topPositions[i] + 'px';
 			newPiece.style.backgroundPosition = leftPos + " " + rightPos;
 		}
 	}

 	/**
 	* Highlights puzzle pieces that the user can move.
 	* @param {object} piece - the user selected puzzle piece
 	*/
 	function highlightPiece(piece) {
 		if (!isMovable(piece)) {
 			return;
 		}
 		piece.classList.add("highlighted");
 	}

 	/**
 	* Unhighlights puzzle piece after the user moves cursor away.
 	* @param {object} piece - the user selected puzzle piece
 	*/
 	function unHighlightPiece(piece) {
 		piece.classList.remove("highlighted");
 	}

 	/**
 	* Moves a blank-adjacent puzzle piece into the blank square.
 	* @param {object} piece - the user selected puzzle piece
 	*/
 	function movePiece(piece) {
 		if (!isMovable(piece)) {
 			return;
 		}
 		let i = 4 * blankY + blankX;
 		piece.style.left = leftPositions[i] + "px";
 		piece.style.top = topPositions[i] + "px";
 		let newID = idFromXY(blankX, blankY);
 		blankX = xFromID(piece.id);
 		blankY = yFromID(piece.id);
 		piece.id = newID;
 	}

 	/**
 	* Gets row of puzzle piece from its ID.
 	* @param {string} id - puzzle piece ID.
 	* @return {int} - row number.
 	*/
 	function xFromID(id) {
 		let coordinates = id.split("_");
 		return parseInt(coordinates[0]);
 	}

 	/**
 	* Gets column of puzzle piece from its ID.
 	* @param {string} id - puzzle piece ID.
 	* @return {int} - column number.
 	*/
 	function yFromID(id) {
 		let coordinates = id.split("_");
 		return parseInt(coordinates[1]);
 	}

 	/**
 	* Creates an ID for a puzzle piece given its x (row) and y (column) positions
 	* @param {int} x - puzzle piece row location.
 	* @param {int} x - puzzle piece column location.
 	* @return {string} - puzzle piece ID.
 	*/
 	function idFromXY(x, y) {
 		return x + "_" + y;
 	}

 	/**
 	* Determines whether a puzzle piece is adjacent to the blank square and thus moveable.
 	* @param {object} piece - puzzle piece.
 	* @return {boolean} - is the piece moveable.
 	*/
 	function isMovable(piece) {
 		let x = xFromID(piece.id);
 		let y = yFromID(piece.id);
 		if (x == blankX) {
 			if (y == blankY - 1 || y == blankY + 1) {
 				return true;
 			}
 		}
 		if (y == blankY) {
 			if (x == blankX - 1 || x == blankX + 1) {
 				return true;
 			}
 		}
 		return false;
 	}

 	/**
 	* Shuffles the puzzle pieces into a random order.
 	*/
 	function shuffle() {
 		for (let i = 0; i < 1000; i++) {
 			let neighbors = nextToBlank();
 			let random = parseInt(Math.random() * neighbors.length);
 			movePiece(neighbors[random]);
 		}
 	}

 	/**
 	* Returns the IDs of puzzle pieces adjacent to the blank square.
 	* @return {array} - IDs of pieces.
 	*/
 	function nextToBlank() {
 		let moveable = [];
 		let puzzlePieces = document.querySelectorAll(".puzzle-piece");
 		for (let i = 0; i < puzzlePieces.length; i++) {
 			if (isMovable(puzzlePieces[i])) {
 				moveable.push(puzzlePieces[i]);
 			}
 		}
 		return moveable;
 	}

 	/**
 	* Returns the element that has the ID attribute with the specified value.
 	* @param {string} id - element ID
 	* @return {object} DOM object associated with id
 	*/
 	function $(id) {
 		return document.getElementById(id);
 	}

 })();