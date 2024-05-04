class GameState {
	constructor() {
		this.savedGames = [];
	}

	loadSavedGames() {
		const savedGames = localStorage.getItem("grandpas-lost-sauce_save_games");
		if (savedGames) {
			this.savedGames = JSON.parse(savedGames);
		}
	}

	saveGame() {}
}

class SaveFile {
	constructor(file) {
		this.id = file.id ?? generateID();
		this.game = file.game;
		this.firstCreated = file.firstCreated ?? new Date();
		this.lastSaved = new Date();
	}
}

const gameState = new GameState();
