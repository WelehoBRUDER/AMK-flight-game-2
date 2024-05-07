function createDiceGameElem() {
	// Main container
	const mainCon = document.createElement("div");
	mainCon.className = "diceGame";
	mainCon.style.display = "none";
	document.body.appendChild(mainCon);

	// Game title
	const header = document.createElement("h2");
	header.classList.add("game-title");
	header.textContent = "Ahmed's dice duel";
	mainCon.appendChild(header);

	// NPC Container
	const npcBody = document.createElement("div");
	npcBody.classList.add("npc", "body-left");
	mainCon.appendChild(npcBody);

	// P Element for displaying Computer's score
	let pElemOne = document.createElement("p");
	pElemOne.classList.add("comp-score");
	pElemOne.textContent = "Ahmed's roll: ";
	npcBody.appendChild(pElemOne);

	// Container for the Dice set
	const dices = document.createElement("div");
	dices.classList.add("diceSet");
	mainCon.appendChild(dices);

	// PLayer container
	const playerCon = document.createElement("div");
	playerCon.classList.add("player", "body-right");
	mainCon.appendChild(playerCon);

	// P Element for displaying Player's score
	let pElemTwo = document.createElement("p");
	pElemTwo.classList.add("player-score");
	pElemTwo.textContent = "Player's roll: ";
	playerCon.appendChild(pElemTwo);

	// Roll button for the player
	const rollBtn = document.createElement("button");
	rollBtn.textContent = "Roll the Dices";
	rollBtn.className = "roll";
	mainCon.appendChild(rollBtn);

	// Heading element that shows the win/loss messages
	const endScreenMsg = document.createElement("div");
	endScreenMsg.classList.add("end-screen", "hidden");
	mainCon.appendChild(endScreenMsg);

	// Element for displaying the remaining rolls
	let h3Elem = document.createElement("h3");
	mainCon.appendChild(h3Elem);

	return {
		mainCon,
		header,
		npcBody,
		pElemOne,
		dices,
		playerCon,
		pElemTwo,
		rollBtn,
		h3Elem,
		endScreenMsg,
	};
}

const gameElem = createDiceGameElem();

function diceCreation() {
	const diceClass = document.createElement("div");
	diceClass.className = "dice";

	const faceClasses = ["front", "back", "top", "bottom", "right", "left"];

	for (let i = 0; i < faceClasses.length; i++) {
		const face = document.createElement("div");
		face.className = `face ${faceClasses[i]}`;
		diceClass.appendChild(face);
	}
	return diceClass;
}

let computerTotal = 0;

function rollComputerDices(gameElem) {
	console.log(gameElem.mainCon);
	const diceSet = gameElem.mainCon.querySelector(".diceSet");
	diceSet.innerHTML = "";

	gameElem.rollBtn.disabled = true;
	setTimeout(() => {
		gameElem.rollBtn.disabled = false;
	}, 3500 / settings.animationSpeed);

	const compDiceValues = [];

	// Create and append three separate dice models for the comp
	for (let i = 0; i < 3; i++) {
		const compDice = diceCreation();
		diceSet.appendChild(compDice);

		const value = Math.floor(Math.random() * 6) + 1;
		compDiceValues.push(value);

		console.log("Comp dice values: ", compDiceValues);

		displayDiceValues(compDice, [value]);
	}
	for (let i = 0; i < compDiceValues.length; i++) {
		computerTotal += compDiceValues[i];
	}
	setTimeout(() => {
		gameElem.pElemOne.innerHTML = `Ahmed's roll: <b style="color: darkred">${computerTotal}</b>`;
	}, 3500 / settings.animationSpeed);
	updateRollsLeft(gameElem);
}

function updateRollsLeft(gameElem) {
	if (attempts >= 2) {
		gameElem.h3Elem.innerHTML = `Rolls left: <b style="color: green">${attempts}</b>`;
	} else {
		gameElem.h3Elem.innerHTML = `Rolls left: <b style="color: red">${attempts}</b>`;
	}
}

let attempts = 3;
let playerTotal = 0;

function rollPlayerDices(gameElem) {
	if (attempts > 0) {
		attempts--;

		const diceSet = gameElem.mainCon.querySelector(".diceSet");
		diceSet.innerHTML = "";

		const playerDiceValues = [];

		// Create and append three separate dice models for the player
		for (let i = 0; i < 3; i++) {
			const playerDice = diceCreation();
			diceSet.appendChild(playerDice);

			const value = Math.floor(Math.random() * 6) + 1;
			playerDiceValues.push(value);

			console.log("Player dice values: " + playerDiceValues);

			displayDiceValues(playerDice, [value]);
		}
		gameElem.rollBtn.disabled = true;
		setTimeout(() => {
			gameElem.rollBtn.disabled = false;
		}, 3500 / settings.animationSpeed);

		updateRollsLeft(gameElem);
		playerTotal = 0;
		for (let i = 0; i < playerDiceValues.length; i++) {
			playerTotal += playerDiceValues[i];
		}
		setTimeout(() => {
			gameElem.pElemTwo.innerHTML = `Player's roll: <b style="color: darkred">${playerTotal}</b>`;
		}, 3500 / settings.animationSpeed);
	}
}

function checkWinner(gameElem) {
	if (playerTotal > computerTotal) {
		setTimeout(() => {
			gameElem.rollBtn.hidden = true;
			gameElem.h3Elem.hidden = true;
			gameElem.pElemTwo.innerHTML = `
        Player's roll: <b style="color: #1d8602">${playerTotal}</b>
      `;
			gameElem.endScreenMsg.append(dialog.parseTextFast(translate("ahmed_dice_win").replace("[total]", playerTotal)));
			const leaveButton = document.createElement("button");
			leaveButton.classList.add("leave-minigame-button");
			leaveButton.textContent = translate("leave");
			leaveButton.addEventListener("click", () => {
				game.currentPlayer().wonMinigame();
			});
			gameElem.endScreenMsg.append(leaveButton);
			gameElem.endScreenMsg.classList.remove("hidden");
		}, 3500 / settings.animationSpeed);
	} else if (attempts === 0) {
		setTimeout(() => {
			gameElem.rollBtn.hidden = true;
			gameElem.endScreenMsg.append(dialog.parseTextFast(translate("ahmed_dice_loss")));
			const leaveButton = document.createElement("button");
			leaveButton.classList.add("leave-minigame-button");
			leaveButton.textContent = translate("leave");
			leaveButton.addEventListener("click", () => {
				game.currentPlayer().lostMinigame();
			});
			gameElem.endScreenMsg.append(leaveButton);
			gameElem.endScreenMsg.classList.remove("hidden");
		}, 3500 / settings.animationSpeed);
	}
}

function displayDiceValues(dice, values) {
	soundController.playSound("diceRoll");
	dice.style.animation = `rolling ${3 / settings.animationSpeed}s`;
	setTimeout((dice.style.transition = `${0.4 / settings.animationSpeed}s`), 0);
	setTimeout(() => {
		values.forEach((value) => {
			const rotation = getRotationForValue(value);
			dice.style.animationFillMode = "forwards";
			dice.style.transform = rotation;
			setTimeout(() => {}, 400 / settings.animationSpeed);
		});

		dice.style.animation = "none";
	}, 3300 / settings.animationSpeed);
}

function getRotationForValue(value) {
	switch (value) {
		case 1:
			return "rotateX(0deg) rotateY(0deg)";
		case 6:
			return "rotateX(180deg) rotateY(0deg)";
		case 2:
			return "rotateX(-90deg) rotateY(0deg)";
		case 5:
			return "rotateX(90deg) rotateY(0deg)";
		case 3:
			return "rotateX(0deg) rotateY(90deg)";
		case 4:
			return "rotateX(0deg) rotateY(-90deg)";
		default:
			return "rotateX(0deg) rotateY(0deg)";
	}
}

function startDiceGame() {
	gameElem.mainCon.style.display = "grid";
}

function closeDiceGame() {
	gameElem.mainCon.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => rollComputerDices(gameElem));
gameElem.rollBtn.addEventListener("click", () => {
	rollPlayerDices(gameElem);
	checkWinner(gameElem);
});
