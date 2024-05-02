class Settings {
	constructor(base, noLoad = false) {
		this.musicVolume = base.musicVolume ?? 0.2;
		this.soundVolume = base.soundVolume ?? 0.2;

		if (!noLoad) this.load();
	}

	reset(set) {
		const baseSettings = new Settings(set, true);
		Object.keys(this).forEach((key) => {
			this[key] = baseSettings[key];
		});
	}

	load() {
		const loadedSettings = localStorage.getItem("grandpas-lost-sauce_game-settings");
		if (loadedSettings) {
			const parsed = JSON.parse(loadedSettings);
			this.reset(parsed);
		}
	}

	save() {
		const save = JSON.stringify(this);
		localStorage.setItem("grandpas-lost-sauce_game-settings", save);
	}

	setVolume(options) {
		if (options.music) {
			this.musicVolume = options.music;
		}
		if (options.sound) {
			this.soundVolume = options.sound;
		}
		soundController.updateVolume();
		this.save();
	}

	getVolume(options) {
		if (options.music) {
			return this.musicVolume;
		}

		return this.soundVolume;
	}
}
const settingsOptions = [
	{
		id: "musicVolume",
		type: "range",
		callback: "settings.setVolume({music: <x>})",
		scale: 0.01,
		values: [0, 100],
		tooltip: "music_volume_tt",
	},
	{
		id: "soundVolume",
		type: "range",
		callback: "settings.setVolume({sound: <x>})",
		scale: 0.01,
		values: [0, 100],
		tooltip: "sound_volume_tt",
	},
];

function createSettings() {
	const settingsContent = document.createElement("div");
	settingsContent.classList.add("settings");
	settingsOptions.forEach((setting) => {
		const container = document.createElement("div");
		if (setting.type === "range") {
			container.classList.add("sliderContainer");
			const text = document.createElement("p");
			const slider = document.createElement("input");
			const textVal = document.createElement("p");
			slider.classList.add("slider");
			textVal.classList.add("inputValue");
			text.textContent = translate(setting.id);
			slider.type = "range";
			slider.min = `${setting.values[0]}`;
			slider.max = `${setting.values[1]}`;
			console.log(settings[setting.id]);
			slider.value = settings[setting.id].toString() / setting.scale;
			container.classList.add(setting.id);
			if (setting.tooltip) {
				const tt = new Tooltip({ element: container, text: translate(setting.tooltip) });
				tt.create();
			}
			textVal.textContent = `${parseInt(slider.value).toString()}`;
			slider.oninput = () => {
				const value = parseFloat(slider.value) * setting.scale;
				const callback = setting.callback.replace("<x>", value);
				eval(callback);
				textVal.textContent = `${parseInt(slider.value).toString()}`;
			};
			text.append(textVal);
			container.append(text, slider);
			settingsContent.append(container);
		}
	});
	return settingsContent;
}

settingsOptions;

const settings = new Settings({});

setTimeout(() => {
	document.querySelector("#game").append(createSettings());
}, 800);
