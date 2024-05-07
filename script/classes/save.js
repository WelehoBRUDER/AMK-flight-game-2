class GameState {
	constructor() {
		this.savedGames = [];
		this.currentSave = "";
		this.loadSavedGames();
	}

	loadSavedGames() {
		const savedGames = localStorage.getItem("grandpas-lost-sauce_save-games");
		if (savedGames) {
			this.savedGames = JSON.parse(savedGames);
			this.savedGames.forEach((save, index) => {
				this.savedGames[index] = new SaveFile(save, false);
			});
		}
	}

	getFile(id) {
		return this.savedGames.findIndex((save) => save.id === id);
	}

	sortSaves() {
		this.savedGames = this.savedGames.sort((a, b) => b.lastSaved.getTime() - a.lastSaved.getTime());
	}

	displaySavedGames() {
		savesDiv.innerHTML = "";
		console.log(this.savedGames);
		this.savedGames.forEach((save) => {
			console.log(save);
			const saveRow = document.createElement("div");
			saveRow.classList.add("save-row");
			const saveInfo = document.createElement("pre");
			saveInfo.textContent = `${save.name} || ${translate("last_saved")}: ${new Date(save.lastSaved).toLocaleDateString(
				"fi-FI"
			)} @ ${new Date(save.lastSaved).toLocaleTimeString("fi-FI")}`;
			const saveOver = document.createElement("button");
			const loadSave = document.createElement("button");
			const deleteSave = document.createElement("button");
			saveRow.style.display = "flex";
			saveOver.textContent = translate("save");
			loadSave.textContent = translate("load");
			deleteSave.textContent = translate("delete");
			saveOver.addEventListener("click", () => {
				this.saveOver(save.id);
			});
			loadSave.addEventListener("click", () => {
				this.loadGame(save.id);
			});
			deleteSave.addEventListener("click", () => {
				this.deleteSave(save.id);
			});
			saveRow.append(saveInfo, saveOver, loadSave, deleteSave);
			savesDiv.append(saveRow);
		});
	}

	// WIP
	loadGame(id, confirm = false) {
		const save = this.savedGames[this.getFile(id)];
		if (save) {
			this.currentSave = save.id;
			game.reset(save.game);
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
		localStorage.setItem("grandpas-lost-sauce_save-games", JSON.stringify(this.savedGames));
		this.displaySavedGames();
	}

	saveOver(id, auto) {
		const save = this.savedGames[this.getFile(id)];
		if (save) {
			this.saveGame(save.name, id, save);
		}
		this.displaySavedGames();
	}

	deleteSave(id) {
		const save = this.savedGames[this.getFile(id)];
		if (save) {
			this.savedGames = this.savedGames.filter((save) => save.id !== id);
			localStorage.setItem("grandpas-lost-sauce_save-games", JSON.stringify(this.savedGames));
			this.displaySavedGames();
		}
	}
}

const saveInput = document.querySelector(".save-name");
const savesDiv = document.querySelector(".existing-saves");

class SaveFile {
	constructor(file, save = true) {
		this.id = file.id ?? generateID();
		this.name = file.name;
		this.game = file.game ?? game;
		this.firstCreated = new Date(file.firstCreated) ?? new Date();
		this.lastSaved = save ? new Date() : new Date(file.lastSaved);
	}
}

const gameState = new GameState();

function createNewSave() {
	gameState.saveGame(saveInput.value);
}
