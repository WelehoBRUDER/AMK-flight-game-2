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

	// Creates player using Player class and adds to the list
	// addPlayer(i, start) {
	// 	playerName = `${i}Player`;
	// 	clear_and_exit_check(player_name);
	// 	playerLocation = "EFHK"
	// 	playerMoney = 10000;
	// 	.players.append(
	// 		Player(i, player_name, 0, player_location, player_money, 0, 0, 0, start["latitude_deg"], start["longitude_deg"])
	// 	);
	// }

	addPlayer(player) {
		this.players.push(new Player(player));
	}

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

	saveGame() {}
}

const game = new Game();
