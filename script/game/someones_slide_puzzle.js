// ELEMENTS

// Main container
const gameBody = document.createElement("div");
gameBody.classList.add("container");
document.body.appendChild(gameBody);

// Container for the img
const imgCon = document.createElement("section");
imgCon.classList.add("board");
gameBody.appendChild(imgCon);

// Actual img for the puzzle
/*const puzzleImg = document.createElement('img');
const source = puzzleImg.src = `./images/istockphoto-536650430-612x612.jpg`;
imgCon.appendChild(puzzleImg)
*/

const hElem = document.createElement("h2");
hElem.classList.add("turns");
gameBody.appendChild(hElem);
//hElem.textContent = 'Turns: ';

// FUNCTIONALITIES
const rows = 3;
const columns = 3;

let currTile;
let otherTile; //blank tile

let turns = 0;

const imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
const solvedOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function startPuzzle() {
	const src = "images/pig.png";
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {
			const slider = document.createElement("img");
			slider.src = src;
			slider.style.objectFit = "none";
			slider.style.width = "300px";
			slider.style.height = "300px";
			slider.style.objectPosition = `${Math.round(x * (100 / (columns - 1)))}% ${Math.round(y * (100 / (rows - 1)))}%`;
			dragElem(slider);
			imgCon.append(slider);
		}
	}
}

startPuzzle();

// window.onload = function () {
// 	for (let r = 0; r < rows; r++) {
// 		for (let c = 0; c < columns; c++) {
// 			let tile = document.createElement("img");
// 			tile.id = r.toString() + "-" + c.toString();
// 			tile.src = `images/${imgOrder.shift()}.jpg`;

// 			tile.addEventListener("dragstart", dragStart); //click an image to drag
// 			tile.addEventListener("dragover", dragOver); //moving image around while clicked
// 			tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
// 			tile.addEventListener("dragleave", dragLeave); //dragged image leaving anohter image
// 			tile.addEventListener("drop", dragDrop); //drag an image over another image, drop the image
// 			tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles

// 			imgCon.appendChild(tile);
// 		}
// 	}
// };

function dragStart() {
	currTile = this;
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
	otherTile = this;
}

// function dragEnd() {
// 	if (!otherTile.src.includes("3.jpg")) {
// 		return;
// 	}

// 	let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
// 	let r = parseInt(currCoords[0]);
// 	let c = parseInt(currCoords[1]);

// 	let otherCoords = otherTile.id.split("-");
// 	let r2 = parseInt(otherCoords[0]);
// 	let c2 = parseInt(otherCoords[1]);

// 	let moveLeft = r === r2 && c2 === c - 1;
// 	let moveRight = r === r2 && c2 === c + 1;

// 	let moveUp = c === c2 && r2 === r - 1;
// 	let moveDown = c === c2 && r2 === r + 1;

// 	let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

// 	if (isAdjacent) {
// 		let currImg = currTile.src;
// 		let otherImg = otherTile.src;

// 		currTile.src = otherImg;
// 		otherTile.src = currImg;

// 		turns += 1;
// 		document.querySelector(".turns").innerHTML = `Turns: <span>${turns}</span> `;

// 		if (isSolved()) {
// 			hElem.innerHTML = `You win this time... Here's your (insert item name)`;
// 		}
// 	}
// }

function isSolved() {
	let tiles = imgCon.querySelectorAll("img");

	for (let i = 0; i < solvedOrder.length; i++) {
		let tileId = tiles[i].id;
		let tileNumber = tileId.split("-")[1];
		let tileSrc = tiles[i].src;
		let solvedSrc = `images/${solvedOrder[i]}.jpg`;

		if (tileNumber !== solvedOrder[i] || tileSrc !== solvedSrc) {
			return false;
		}
	}
	return true;
}
