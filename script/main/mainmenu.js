const title_screen = document.querySelector("#title-screen");
const main_menu = document.querySelector("#main-menu");

const options_btn = document.querySelector("#options");
const options_menu = document.querySelector("#options-menu");
const buttons = document.querySelector("#buttons");

const new_game_btn = document.querySelector("#new-game");
const new_game_scrn = document.querySelector("#new-game-screen");
const start_btn = document.querySelector("#start-game");

const load_save_btn = document.querySelector("#load-save");
const load_save_scrn = document.querySelector("#load-save-screen");
const load_btn = document.querySelector("#load-game");
const save_btn = document.querySelector("#save-game");

const help_btn = document.querySelector("#read-help");
const help_scrn = document.querySelector("#help-screen");

const story_btn = document.querySelector("#read-story");
const story_scrn = document.querySelector("#story-screen");
const close_dialog_btn = document.querySelector("#close-dialog");

const settings_btn = document.querySelector("#settings");
const settings_scrn = document.querySelector("#settings-screen");

const close_options_btn = document.querySelector("#close-options");

const quests_btn = document.querySelector("#quests");
const quests_scrn = document.querySelector("#quests-screen");
const close_quests_btn = document.querySelector("#close-quests");

const map_area = document.querySelector("#map-area");
const map_scrn = document.querySelector("#map");
const bottom_bar = document.querySelector("#bottom-bar");

const refresh = document.querySelector("#refresh");

let options_open = true;
let quests_open = false;
let game_started = false;

const all_buttons = document.querySelectorAll("button");
const all_divs = document.querySelectorAll("div");

// Refreshes all necessary text for translation purposes
function refreshText() {
	all_buttons.forEach((btn) => {
		btn.textContent = translate(btn.name);
	});
}

// Hides all the option menu screens. Used right before opening a screen, to prevent overlap.
function hideBoxes() {
	new_game_scrn.hidden = true;
	load_save_scrn.hidden = true;
	help_scrn.hidden = true;
	story_scrn.hidden = true;
	settings_scrn.hidden = true;
}

// Plays a 'click' sound effect every time any button is clicked.
all_buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		soundController.playSound("click", true);
	});
});

function hideStart() {
	title_screen.hidden = true;
}

function showStart() {
	title_screen.hidden = false;
}

// Fading animation for the start screen
title_screen.addEventListener("click", function () {
	title_screen.style.opacity = "0";
	setTimeout(hideStart, 1000);
	game_started = true;
	options_menu.style.display = "flex";
	options_open = true;
	refreshText();
});

refresh.addEventListener("click", function() {
	refreshText();
})

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
	main_menu.hidden = true;
	options_menu.style.display = "none";
	map_scrn.hidden = false;
	map_area.hidden = false;
	bottom_bar.style.display = "flex";
	options_btn.hidden = false;
	quests_btn.hidden = false;
	setup();
});

load_save_btn.addEventListener("click", function () {
	hideBoxes();
	load_save_scrn.hidden = false;
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

close_options_btn.addEventListener("click", function () {
	options_menu.style.display = "none";
	options_open = false;
	if (game_started) {
		title_screen.hidden = false;
		title_screen.style.opacity = "1";
		game_started = true;
	}
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

game.currentPlayer().rollFlights();