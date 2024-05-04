const start_menu = document.querySelector("#start-menu");

const options_button = document.querySelector("#options-button");
const options_menu = document.querySelector("#options-menu");
const buttons = document.querySelector("#buttons");

const new_game_button = document.querySelector("#new-game");
const new_game_screen = document.querySelector("#new-game-screen");
const start_button = document.querySelector("#start-game");

const save_load_button = document.querySelector("#save-load");
const save_load_screen = document.querySelector("#save-load-screen");

const help_button = document.querySelector("#read-help");
const help_screen = document.querySelector("#help-screen");

const story_button = document.querySelector("#read-story");
const story_screen = document.querySelector("#story-screen");
const close_dialog = document.querySelector("#close-dialog");

const settings_button = document.querySelector("#settings");
const settings_screen = document.querySelector("#settings-screen");
const music_button = document.querySelector("#music");
const english_button = document.querySelector("#lang-english");
const finnish_button = document.querySelector("#lang-suomi");

const close_button = document.querySelector("#close");

const map_area = document.querySelector("#map-area");
const map_screen = document.querySelector("#map");

let options_open = true;

// Hides all the option menu screens. Used right before opening a screen, to prevent overlap.
function hideBoxes() {
	new_game_screen.hidden = true;
	save_load_screen.hidden = true;
	help_screen.hidden = true;
	story_screen.hidden = true;
	settings_screen.hidden = true;
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
	close_button.style.display = "none";
	setTimeout(hideStart, 1000);
});

options_button.addEventListener("click", function () {
	if (options_open) {
		options_menu.style.display = "none";
		options_open = false;
	} else {
		options_menu.style.display = "flex";
		options_open = true;
	}
});

new_game_button.addEventListener("click", function () {
	hideBoxes();
	new_game_screen.hidden = false;
});

start_button.addEventListener("click", function () {
	options_menu.style.display = "none";
	map_screen.hidden = false;
	map_area.hidden = false;
	close_button.style.display = "block";
	options_button.hidden = false;
	setup();
});

save_load_button.addEventListener("click", function () {
	hideBoxes();
	save_load_screen.hidden = false;
});

help_button.addEventListener("click", function () {
	hideBoxes();
	help_screen.hidden = false;
});

story_button.addEventListener("click", function () {
	hideBoxes();
	buttons.hidden = true;
	story_screen.hidden = false;
});

close_dialog.addEventListener("click", function () {
	buttons.hidden = false;
	story_screen.hidden = true;
});

settings_button.addEventListener("click", function() {
	hideBoxes();
	settings_screen.hidden = false;
})

// Pauses the music if it's currently playing, and vice versa. Also toggles the button text.
music_button.addEventListener("click", function () {
	if (soundController.isMusicPlaying()) {
		soundController.pauseMusic();
		music_button.textContent = "Music: OFF";
	} else {
		soundController.playSound("shanty");
		music_button.textContent = "Music: ON";
	}
});

english_button.addEventListener("click", function() {

})

finnish_button.addEventListener("click", function() {

})

close_button.addEventListener("click", function () {
	options_menu.style.display = "none";
	options_open = false;
});

if (dev.enabled) {
	hideStart();
	options_menu.style.display = "none";
	map_screen.hidden = false;
	map_area.hidden = false;
	close_button.style.display = "block";
	options_button.hidden = false;
	setup();
}
