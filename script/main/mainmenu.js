const start_menu = document.querySelector("#start-menu");

const options_btn = document.querySelector("#options");
const options_menu = document.querySelector("#options-menu");
const buttons = document.querySelector("#buttons");

const new_game_btn = document.querySelector("#new-game");
const new_game_scrn = document.querySelector("#new-game-screen");
const start_btn = document.querySelector("#start-game");

const save_load_btn = document.querySelector("#save-load");
const save_load_scrn = document.querySelector("#save-load-screen");

const help_btn = document.querySelector("#read-help");
const help_scrn = document.querySelector("#help-screen");

const story_btn = document.querySelector("#read-story");
const story_scrn = document.querySelector("#story-screen");
const close_dialog_btn = document.querySelector("#close-dialog");

const settings_btn = document.querySelector("#settings");
const settings_scrn = document.querySelector("#settings-screen");
const music_btn = document.querySelector("#music");
const english_btn = document.querySelector("#lang-english");
const finnish_btn = document.querySelector("#lang-suomi");

const close_options_btn = document.querySelector("#close-options");

const quests_btn = document.querySelector("#quests");
const quests_scrn = document.querySelector("#quests-screen");
const close_quests_btn = document.querySelector("#close-quests");

const map_area = document.querySelector("#map-area");
const map_scrn = document.querySelector("#map");

let options_open = true;
let quests_open = false;

// Hides all the option menu screens. Used right before opening a screen, to prevent overlap.
function hideBoxes() {
	new_game_scrn.hidden = true;
	save_load_scrn.hidden = true;
	help_scrn.hidden = true;
	story_scrn.hidden = true;
	settings_scrn.hidden = true;
}

// Plays a 'click' sound effect every time any button is clicked.
document.querySelectorAll("button").forEach((btn) => {
	btn.addEventListener("click", () => {
		soundController.playSound("click", true);
	});
});

function hideStart() {
	start_menu.hidden = true;
}

// Fading animation for the start screen
start_menu.addEventListener("click", function () {
	start_menu.style.opacity = "0";
	close_options_btn.style.display = "none";
	setTimeout(hideStart, 1000);
});

options_btn.addEventListener("click", function () {
	if (options_open) {
		options_menu.style.display = "none";
		options_open = false;
	} else {
		quests_scrn.hidden = true;
		quests_open = true;
		options_menu.style.display = "flex";
		options_open = true;
	}
});

new_game_btn.addEventListener("click", function () {
	hideBoxes();
	new_game_scrn.hidden = false;
});

start_btn.addEventListener("click", function () {
	options_menu.style.display = "none";
	map_scrn.hidden = false;
	map_area.hidden = false;
	close_options_btn.style.display = "block";
	options_btn.hidden = false;
	quests_btn.hidden = false;
	setup();
});

save_load_btn.addEventListener("click", function () {
	hideBoxes();
	save_load_scrn.hidden = false;
});

help_btn.addEventListener("click", function () {
	hideBoxes();
	help_scrn.hidden = false;
});

story_btn.addEventListener("click", function () {
	hideBoxes();
	buttons.hidden = true;
	story_scrn.hidden = false;
});

close_dialog_btn.addEventListener("click", function () {
	buttons.hidden = false;
	story_scrn.hidden = true;
});

settings_btn.addEventListener("click", openSettingsScreen);

function openSettingsScreen() {
	hideBoxes();
	settings_scrn.hidden = false;
	settings_scrn.innerHTML = "";
	settings_scrn.append(createSettings());
}

// Pauses the music if it's currently playing, and vice versa. Also toggles the button text.
music_btn.addEventListener("click", function () {
	if (soundController.isMusicPlaying()) {
		soundController.pauseMusic();
		music_btn.textContent = "Music: OFF";
	} else {
		soundController.playSound("shanty");
		music_btn.textContent = "Music: ON";
	}
});

english_btn.addEventListener("click", function () {});

finnish_btn.addEventListener("click", function () {});

close_options_btn.addEventListener("click", function () {
	options_menu.style.display = "none";
	options_open = false;
});

quests_btn.addEventListener("click", function () {
	if (quests_open) {
		quests_scrn.hidden = true;
		quests_open = false;
	} else {
		options_menu.style.display = "none";
		quests_scrn.hidden = false;
		quests_open = true;
	}
});

close_quests_btn.addEventListener("click", function () {
	quests_scrn.hidden = true;
	quests_open = false;
});

if (dev.enabled) {
	hideStart();
	options_menu.style.display = "none";
	map_scrn.hidden = false;
	map_area.hidden = false;
	close_options_btn.style.display = "block";
	options_btn.hidden = false;
	options_open = false;
	setup();
}
