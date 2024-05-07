const musicPlayer = document.querySelector(".music-player");

const sounds = {
	click: {
		id: "click",
		src: "sounds/click.mp3",
		loop: false,
	},
	red: {
		id: "red",
		src: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
		loop: false,
	},
	green: {
		id: "green",
		src: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
		loop: false,
	},
	blue: {
		id: "blue",
		src: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
		loop: false,
	},
	yellow: {
		id: "yellow",
		src: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
		loop: false,
	},
	newarea: {
		id: "newarea",
		src: "sounds/newarea.mp3",
		loop: false,
	},
	shanty: {
		id: "shanty",
		src: "sounds/seashanty2.mp3",
		music: true,
		loop: true,
	},
	death: {
		id: "death",
		src: "sounds/death.mp3",
		loop: false,
	}
};

class SoundController {
	constructor() {
		this.players = [];
	}

	getAvailablePlayer(id) {
		return this.players.find((pl) => {
			if (pl.id === id) {
				if ((pl.audio.currentTime === pl.audio.duration && pl.audio.paused) || pl.music) {
					return pl;
				}
			}
		});
	}
	/**
	 * Plays the sound file specified
	 * @param {string} id - id of the sound to be played
	 * @param {boolean} forceParallel - make this true if the sound needs to play parallel to a sound with the same id.
	 */
	playSound(id, forceParallel = false) {
		console.log(id, sounds);
		const sound = sounds[id];
		const player = this.getAvailablePlayer(id);
		if (player) {
			player.audio.play();
		} else {
			const newPlayer = this.createPlayer(sound);
			newPlayer.audio.play();
			this.players.push(newPlayer);
		}
	}

	/**
	 * Stops specified sound from being played. Can also stop music.
	 * @param {*} id - id of the sound that will be stopped
	 */
	pauseSound(id) {
		const player = this.players.find((pl) => pl.id === id);
		if (player) {
			player.pause();
		}
	}

	pauseMusic() {
		this.players.forEach((pl) => {
			if (pl.music) {
				pl.audio.pause();
			}
		});
	}

	updateVolume() {
		this.players.forEach((pl) => {
			pl.audio.volume = settings.getVolume({ music: pl.music });
		});
	}

	isMusicPlaying() {
		const firstMusicPlayer = this.players.find((pl) => pl.music);
		if (firstMusicPlayer && !firstMusicPlayer?.audio.paused && firstMusicPlayer?.audio.currentTime > 0) return true;
		return false;
	}

	/**
	 * Stops every sound currently being played
	 * @param {*} options - {stopMusic: boolean} also stops all music being played.
	 */
	stopAllSounds(options) {
		this.players.forEach((pl) => {
			if (!this.music || options.stopMusic) {
				pl.audio.pause();
			}
		});
	}

	/**
	 * Deletes every player currently in soundController.players[]
	 */
	destroyAllPlayers() {
		this.stopAllSounds({ stopMusic: true });
		this.players = [];
	}

	createPlayer(sound) {
		const soundObject = {};
		const audio = new Audio(sound.src);
		audio.loop = sound.loop;
		audio.volume = settings.getVolume({ music: sound.music });
		audio.load();
		soundObject.id = sound.id;
		soundObject.music = sound.music;
		soundObject.audio = audio;
		return soundObject;
	}
}

const soundController = new SoundController();
