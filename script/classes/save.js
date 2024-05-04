class GameState {
	constructor() {
		this.savedGames = [];
		this.currentSave = "";
	}

	loadSavedGames() {
		const savedGames = localStorage.getItem("grandpas-lost-sauce_save_games");
		if (savedGames) {
			this.savedGames = JSON.parse(savedGames);
		}
	}

	getFile(id) {
		return this.savedGames.findIndex((save) => save.id === id);
	}

	sortSaves() {
		this.savedGames = this.savedGames.sort((a, b) => b.lastSaved.getTime() - a.lastSaved.getTime());
	}

	// WIP
	loadGame(id, confirm = false) {
		const save = this.savedGames[this.getFile(id)];
		if (save) {
			try {
			} catch (err) {
				console.error("Oopsie", err);
			}
		}
	}

	saveGame(name, id = null, file = null, auto = false) {
		const saveFile = file ? new SaveFile(file) : new SaveFile({ id, name });
		this.currentSave = saveFile.id;
		const existingSaveIndex = this.getFile(id);
		if (existingSaveIndex > -1) {
			this.savedGames[existingSaveIndex] = saveFile;
		} else {
			this.savedGames.push(saveFile);
		}
		this.sortSaves();
		localStorage.setItem("grandpas-lost-sauce_save_games", JSON.stringify(this.savedGames));
	}

	saveOver(id, auto) {
		const save = this.savedGames[this.getFile(id)];
		if (save) {
			this.saveGame(save.name, id, save);
		}
	}

	deleteSave(id) {
		const save = this.savedGames[this.getFile(id)];
		if (save) {
			this.savedGames = this.savedGames.filter((save) => save.id !== id);
			localStorage.setItem("grandpas-lost-sauce_save_games", JSON.stringify(this.savedGames));
		}
	}
}

class SaveFile {
	constructor(file) {
		this.id = file.id ?? generateID();
		this.name = file.name;
		this.game = file.game;
		this.firstCreated = file.firstCreated ?? new Date();
		this.lastSaved = new Date();
	}
}

const gameState = new GameState();
