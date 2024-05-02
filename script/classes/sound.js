const musicPlayer = document.querySelector(".music-player");

const sounds = {
	click: {
		id: "click",
		src: "sounds/click.mp3",
		loop: false,
	},
	shanty: {
		id: "shanty",
		src: "sounds/seashanty2.mp3",
		music: true,
		loop: true,
	},
};

class SoundController {
	constructor() {
		this.volume = 0.3;
		this.players = [];
	}

	/**
	 * Plays the sound file specified
	 * @param {string} id - id of the sound to be played
	 * @param {boolean} forceParallel - make this true if the sound needs to play parallel to a sound with the same id.
	 */
	playSound(id, forceParallel = false) {
		const sound = sounds[id];
		const player = this.players.find((pl) => pl.id === id);
		if (player && !forceParallel) {
			player.audio.play();
		} else {
			const newPlayer = this.createPlayer(sound, player && forceParallel ? this.players.length : -1);
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
			player.stop();
		}
	}

	pauseMusic() {
		this.players.forEach((pl) => {
			if (pl.music) {
				pl.audio.stop();
			}
		});
	}

	updateVolume() {
		this.players.forEach((pl) => {
			pl.audio.volume = this.volume;
		});
	}

	isMusicPlaying() {
		const firstMusicPlayer = this.players.forEach((pl) => pl.music);
		if (firstMusicPlayer && !firstMusicPlayer.paused && firstMusicPlayer.currentTime > 0) return true;
		return false;
	}

	/**
	 * Stops every sound currently being played
	 * @param {*} options - {stopMusic: boolean} also stops all music being played.
	 */
	stopAllSounds(options) {
		this.players.forEach((pl) => {
			if (!this.music || options.stopMusic) {
				pl.audio.stop();
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

	createPlayer(sound, increment = -1) {
		const soundObject = {};
		const audio = new Audio(sound.src);
		audio.loop = sound.loop;
		audio.volume = this.volume;
		audio.load();
		soundObject.id = `${sound.id}${increment > 0 ? increment : ""}`;
		soundObject.music = sound.music;
		soundObject.audio = audio;
		return soundObject;
	}
}

const soundController = new SoundController();
