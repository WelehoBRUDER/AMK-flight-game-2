class Game {
	constructor() {
		this.players = [];
		this.items = [];
		this.grandpasTravels = [];
		this.currentMinigameItem = "";
		this.turn = 0;
		this.currentPlayerIndex = 0;
		this.lastPlayerIndex = 0;
		this.flights = [];
		this.difficulty = null;

		this.closeMinigames();
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty;
	}

	getRemainingPlayers() {
		return this.players.filter((p) => {
			return !p.hasLost() && !p.finished;
		});
	}
	async createGrandpasTravels() {
		this.grandpasTravels = [];
		/* getRandomAirports can't return two airports from the same continent
			so we call it twice to get enough airports.
		 */
		const a = await routes.getRandomAirports(6);
		const b = await routes.getRandomAirports(6);
		const airports = a.concat(b);
		this.grandpasTravels = airports.map((port) => port.ident);
	}

	addItems(ids) {
		this.items = [];
		const _ports = [...this.grandpasTravels];
		ids.forEach((item) => {
			const randomPort = random(_ports.length - 1, 0);
			this.items.push({ id: item, airport: _ports[randomPort] });
			_ports.splice(randomPort, 1);
		});
		// this.items.forEach((itm) => {
		// 	const item = items[itm.id];
		// 	const city = "Helsinki";
		// 	const flavor = translate("flying_hint_1")
		// 		.replace("[itmCol]", item.color)
		// 		.replace("[item]", translate(item.id))
		// 		.replace("[city]", city);
		// 	console.log(flavor);
		// 	bottom_bar.append(dialog.parseTextFast(flavor));
		// });
	}

	getItemByPort(ident) {
		return this.items.find(({ airport }) => airport === ident);
	}

	addPlayer(player) {
		this.players.push(new Player(player));
	}

	/**
	 * Get player who's turn it is currently.
	 * @returns {Player} player object
	 */
	currentPlayer() {
		return this.players[this.currentPlayerIndex];
	}

	getCurrentPlayers() {
		_players = this.getRemainingPlayers();
		if (_players.length === 0) {
			return this.players[this.lastPlayerIndex];
		}
		player = _players[this.turn].lastPlayerIndex = player.id - 1;
		return player;
	}

	nextPlayer() {
		lockMap();
		this.currentPlayerIndex += 1;
		if (this.currentPlayerIndex >= this.playersAmount()) {
			this.advanceTurn();
			this.currentPlayer().updateStatsScreen();
		} else {
			this.currentPlayer().updateStatsScreen();
			badassText(
				`§<c>gold<c>${translate("next_player")}§`,
				`${translate("player")} ${this.currentPlayerIndex + 1} | ${this.currentPlayer().screen_name}`
			);
			setTimeout(() => {
				this.currentPlayer().rollFlights();
			}, 5550 / settings.animationSpeed);
		}
	}

	advanceTurn() {
		lockMap();
		this.currentPlayerIndex = 0;
		this.turn++;
		badassText(
			`§<c>gold<c>${translate("new_turn")}§`,
			`${translate("turn")} ${this.turn + 1} | ${translate("player")}: ${this.currentPlayer().screen_name}`
		);
		setTimeout(() => {
			this.currentPlayer().rollFlights();
		}, 5550 / settings.animationSpeed);
	}

	resetTurns() {
		this.turn = 0;
	}

	playersAmount() {
		return this.getRemainingPlayers().length;
	}

	/**
	 * Creates a popup window in the middle of the screen.
	 * Content buttons should use game.removeAllWindows() if the popup needs to be closed.
	 * @param {HTMLElement} content - The actual content of the screen
	 * @param {boolean} canIgnore - Whether or not this window can be closed without consequence (default = true)
	 */
	createWindow(content, canIgnore = true) {
		if (!content) return console.error("This window doesn't have any content! (Missing content HTMLElement from parameters)");
		const popUpWindow = document.createElement("div");
		const closeButton = document.createElement("div");
		const drag = document.createElement("div");
		popUpWindow.classList.add("pop-up-window");
		closeButton.classList.add("close-button", canIgnore ? "." : "unavailable");
		drag.classList.add("drag");
		closeButton.textContent = "x";
		closeButton.addEventListener("click", () => {
			popUpWindow.remove();
		});
		content.classList.add("content");
		popUpWindow.append(drag, closeButton, content);
		document.body.append(popUpWindow);

		dragElem(popUpWindow);
	}

	removeAllWindows() {
		document.querySelectorAll(".pop-up-window").forEach((wind) => wind.remove());
	}

	async init() {
		await this.createGrandpasTravels();
		this.addItems(["coin", "photo", "watch", "sauce"]);
	}

	startMinigame(minigame, item) {
		this.currentMinigameItem = item;
		if (minigame === "slider") {
			console.log("?");
			const randomImage = slideGames[random(slideGames.length - 1, 0)];
			if (slideGame) {
				slideGame.timer.removeTimer();
			}
			slideGame = new SlideGame(randomImage);
			slideGame.createImages();
			slideGame.renderImages();
		} else if (minigame === "dice") {
			startDiceGame();
		} else if (minigame === "hangman") {
			startHangman();
		} else {
			startKaleviGame();
		}
	}

	closeMinigames() {
		this.currentMinigameItem = "";
		slaughterPig();
		closeDiceGame();
		closeKaleviGame();
		elements.gameBody.style.display = "none";
	}
}
const items = {
	coin: {
		id: "coin",
		color: "goldenrod",
	},
	photo: {
		id: "photo",
		color: "lightgray",
	},
	watch: {
		id: "watch",
		color: "cyan",
	},
	sauce: {
		id: "sauce",
		color: "crimson",
	},
};

const game = new Game();

/**
 * @param {HTMLElement} element - HTML element you want the timer to update the textContent in
 * @param {number} max - Set this above 0 if you want the timer to count down from it (milliseconds)
 */
class Timer {
	constructor(element, callback, max = -1) {
		this.current = -1;
		this.last = Date.now();
		this.ms = 0;
		this.callback = callback;
		this.element = element;
		this.max = max ?? -1;
	}

	startTimer() {
		this.timer = setInterval(() => this.update(this), 10);
	}

	clearTimer() {
		clearInterval(this.timer);
	}

	removeTimer() {
		this.clearTimer();
		this.element.textContent = "";
	}

	displayTime() {
		if (this.max > -1) {
			const stamp = new Date(this.max);
			const cur = new Date(this.ms);
			const remaining = new Date(stamp.getTime() - cur.getTime());
			const minutes = remaining.getMinutes();
			const seconds = remaining.getSeconds();
			this.element.textContent = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
			if (minutes <= 0 && seconds <= 0) {
				this.clearTimer();
				this.callback();
			}
		} else {
			const stamp = new Date(this.ms);
			const minutes = stamp.getMinutes();
			const seconds = stamp.getSeconds();
			this.element.textContent = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
		}
	}

	update() {
		this.current = Date.now();
		this.ms += this.current - this.last;
		this.last = this.current;
		this.displayTime();
	}

	padZero(num) {
		return num > 9 ? num : "0" + num;
	}
}
