class Game {
	constructor() {
		this.players = [];
		this.turn = 0;
		this.currentPlayerIndex = 0;
		this.lastPlayerIndex = 0;
		this.flights = [];
		this.difficulty = null;
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty;
	}

	getRemainingPlayers() {
		return this.players.filter((p) => {
			return p.hasLost() || p.finished;
		});
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
		this.currentPlayerIndex += 1;
		if (this.currentPlayerIndex >= this.playersAmount()) {
			this.currentPlayerIndex = 0;
			this.turn++;
		}
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
}

const game = new Game();

game.currentPlayer();
