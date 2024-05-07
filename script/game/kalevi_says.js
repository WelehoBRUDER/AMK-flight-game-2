// ELEMENTS

function kalevisElements() {
	// Game body
	const gameBody = document.createElement("div");
	gameBody.className = "kalevis-body";
	gameBody.style.display = "none";
	document.body.appendChild(gameBody);

	// Main container
	const mainCon = document.createElement("div");
	mainCon.className = "game";
	gameBody.appendChild(mainCon);

	// Heading
	const hElem = document.createElement("h1");
	hElem.className = "kalevi-heading";
	hElem.textContent = "Kalevi Says";
	mainCon.appendChild(hElem);

	// Container for the tiles
	const tilesBody = document.createElement("section");
	tilesBody.classList.add("kalevis-container", "unclickable");
	mainCon.appendChild(tilesBody);

	// Creation of each tile
	const tileSet = [
		{ class: "tile tile-red", data: "red" },
		{ class: "tile tile-green", data: "green" },
		{ class: "tile tile-blue", data: "blue" },
		{ class: "tile tile-yellow", data: "yellow" },
	];

	for (let i = 0; i < tileSet.length; i++) {
		const tile = document.createElement("div");
		tile.className = tileSet[i].class;
		tile.setAttribute("data-tile", tileSet[i].data);
		tilesBody.appendChild(tile);
	}

	// Container for Kalevi
	const kalevisFace = document.createElement("div");
	kalevisFace.classList.add("kalevi-face");
	gameBody.appendChild(kalevisFace);

	// Container for Ronald
	const ronaldsFace = document.createElement("div");
	ronaldsFace.classList.add("ronald-face");
	gameBody.appendChild(ronaldsFace);

	// Container for the information
	const infoSec = document.createElement("div");
	infoSec.className = "info-section";
	mainCon.appendChild(infoSec);

	// Start button
	const startBtn = document.createElement("button");
	startBtn.classList.add("start-kalevi");
	startBtn.textContent = "Start";
	infoSec.appendChild(startBtn);

	// Info
	const information = document.createElement("span");
	information.classList.add("kalevi-info", "hidden");
	infoSec.appendChild(information);

	// Container for audio
	const audioCon = document.createElement("div");
	audioCon.className = "hidden";
	document.body.appendChild(audioCon);

	// Audio for each of the tiles
	const audioData = [
		{ id: "simon1", sound: "red" },
		{
			id: "simon2",
			sound: "green",
		},
		{ id: "simon3", sound: "blue" },
		{
			id: "simon4",
			sound: "yellow",
		},
	];

	for (let i = 0; i < audioData.length; i++) {
		const audioElem = document.createElement("audio");
		audioElem.src = audioData[i].src;
		audioElem.setAttribute("data-sound", audioData[i].sound);
		audioCon.appendChild(audioElem);
	}
	return {
		gameBody,
		mainCon,
		hElem,
		tilesBody,
		tileSet,
		infoSec,
		startBtn,
		information,
		audioCon,
		audioData,
	};
}

// FUNCTIONALITIES

const kaleviGameElements = kalevisElements();
let sequence = [];
let playerSequence = [];
let level = 0;

const kaleviInfoSection = document.querySelector(".game .info-section");
const startButton = document.querySelector(".start-kalevi");
const info = document.querySelector(".kalevi-info");
const heading = document.querySelector(".kalevi-heading");
const tileContainer = document.querySelector(".kalevis-container");
const gameContainer = document.querySelector('.game')

function startKaleviGame() {
	tileContainer.style.display = ''
	kaleviInfoSection.style.marginTop = '0'
	startButton.classList.add("hidden");
	info.classList.remove("hidden");
	sequence = [];
	playerSequence = [];
	level = 0;
	console.log(kaleviGameElements);
	kaleviGameElements.gameBody.style.display = "flex";
	info.textContent = "Wait for Urho Kalevi to show you the pattern.";
	nextRound();
}

function nextRound() {
	level += 1;

	tileContainer.classList.add("unclickable");
	info.textContent = "Wait for Urho Kalevi";
	heading.textContent = `Round ${level} of 6`;

	const nextSequence = [...sequence];
	nextSequence.push(nextPattern());
	play(nextSequence);

	sequence = [...nextSequence];
	setTimeout(() => {
		playerTurn(level);
	}, level * 600 + 1000);
}

function nextPattern() {
	const tiles = ["red", "green", "blue", "yellow"];
	const random = tiles[Math.floor(Math.random() * tiles.length)];

	return random;
}

function activateTile(color) {
	const tile = document.querySelector(`[data-tile='${color}']`);
	const sound = document.querySelector(`[data-sound='${color}']`);

	tile.classList.add("activated");
	console.log(color);
	soundController.playSound(color);

	setTimeout(() => {
		tile.classList.remove("activated");
	}, 300);
}

function play(nextSequence) {
	nextSequence.forEach((color, index) => {
		setTimeout(() => {
			activateTile(color);
		}, (index + 1) * 600);
	});
}

function resetGame(text, condition = "none") {

	info.textContent = text;
	sequence = [];
	playerSequence = [];
	level = 0;
	heading.textContent = "Kalevi Says";
	tileContainer.classList.add("unclickable");
	if (condition !== "none") {
		const leaveButton = document.createElement("button");
		leaveButton.classList.add("leave-minigame-button");
		leaveButton.textContent = translate("leave");
		console.log(gameContainer)
		kaleviInfoSection.append(leaveButton);
		leaveButton.addEventListener("click", () => {
			if (condition === "win") game.currentPlayer().wonMinigame();
			else if (condition === "lose") game.currentPlayer().lostMinigame();
			leaveButton.remove();
		});
	}
}

function playerTurn(level) {
	tileContainer.classList.remove("unclickable");
	info.textContent = `Your turn! Taps required: ${level}`;
}

function handleClick(tile) {
	const index = playerSequence.push(tile) - 1;
	const sound = document.querySelector(`[data-sound='${tile}']`);
	console.log(tile);
	soundController.playSound(tile);

	const remainingTaps = sequence.length - playerSequence.length;

	if (playerSequence[index] !== sequence[index]) {
		tileContainer.style.display = 'none'
		kaleviInfoSection.style.marginTop = '15rem'
		resetGame("You were no match for Kekkonen. (insert item name) is gonna cost you!", "lose");
		return;
	}

	if (playerSequence.length === sequence.length) {
		if (playerSequence.length === 6) {
			tileContainer.style.display = 'none'
			kaleviInfoSection.style.marginTop = '15rem'
			resetGame("*Kekkonen is impressed* Congratulations you've bested me! Here's you (insert item name)", "win");
			return;
		}

		playerSequence = [];
		info.textContent = "Success!";
		setTimeout(() => {
			nextRound();
		}, 1000);
		return;
	}

	info.textContent = `Taps remaining: ${remainingTaps}`;
}

function closeKaleviGame() {
	kaleviGameElements.gameBody.style.display = "none";
}

startButton.addEventListener("click", startKaleviGame);
tileContainer.addEventListener("click", (event) => {
	const { tile } = event.target.dataset;
	if (tile) handleClick(tile);
});
