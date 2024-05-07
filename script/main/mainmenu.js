const music_toggle = document.querySelector("#music-toggle");
const title_screen = document.querySelector("#title-screen");
const main_menu = document.querySelector("#main-menu");

const options_btn = document.querySelector("#options");
const options_menu = document.querySelector("#options-menu");
const buttons = document.querySelector("#buttons");

const new_game_btn = document.querySelector("#new-game");
const new_game_scrn = document.querySelector("#new-game-screen");
const new_game_inputs = document.querySelector("#new-game-inputs");
const difficulty_select = document.querySelector("#difficulty-select");
const player_amount = document.querySelector("#player-amount");
const minus_btn = document.querySelector("#minus-players");
const plus_btn = document.querySelector("#plus-players");
const player_names = document.querySelector("#player-names");
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

const leaderboards_btn = document.querySelector("#leaderboards");
const leader_boards_scrn = document.querySelector("#leaderboards-screen");
const lb_screen_name = document.querySelector("#screen-name");
const lb_score = document.querySelector("#score");
const lb_time = document.querySelector("#time");
const lb_money = document.querySelector("#money");
const lb_co2_consumed = document.querySelector("#co2-consumed");
const lb_distance_traveled = document.querySelector("#distance-traveled");
const lb_real_time = document.querySelector("#real-time");

const settings_btn = document.querySelector("#settings");
const settings_scrn = document.querySelector("#settings-screen");

const close_options_btn = document.querySelector("#close-options");

const quests_btn = document.querySelector("#quests");
const quests_scrn = document.querySelector("#quests-screen");
const item_coin = document.querySelector("#item-coin");
const item_photo = document.querySelector("#item-photo");
const item_watch = document.querySelector("#item-watch");
const item_sauce = document.querySelector("#item-sauce");
const close_quests_btn = document.querySelector("#close-quests");

const end_turn_btn = document.querySelector("#end-turn");

const map_area = document.querySelector("#map-area");
const map_scrn = document.querySelector("#map");
const bottom_bar = document.querySelector("#bottom-bar");
const item_counter = document.querySelector("#item-counter");
const sauce_image = document.querySelector("#sauce-image");
const watch_image = document.querySelector("#watch-image");
const photo_image = document.querySelector("#photo-image");
const coin_image = document.querySelector("#coin-image");

const win_btn = document.querySelector("#win");
const win_scrn = document.querySelector("#win-screen");
const lose_btn = document.querySelector("#lose");
const lose_scrn = document.querySelector("#loss-screen");

let in_main_menu = false;

// Hides all the option menu screens. Used right before opening a screen, to prevent overlap.
function hideBoxes() {
	new_game_scrn.hidden = true;
	load_save_scrn.hidden = true;
	help_scrn.hidden = true;
	story_scrn.hidden = true;
	leader_boards_scrn.hidden = true;
	settings_scrn.hidden = true;
}

// Plays a 'click' sound effect every time any button is clicked.
all_buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		soundController.playSound("click", true);
	});
});

music_toggle.addEventListener("click", function () {
	if (soundController.isMusicPlaying()) {
		music_toggle.src = "images/mute.png";
		soundController.pauseMusic();
	} else {
		music_toggle.src = "images/volume.png";
		soundController.playSound("shanty");
	}
});

win_btn.addEventListener("click", function () {
	if (win_scrn.hidden) {
		displayWinScreen();
	} else {
		closeWinScreen();
	}
});

function displayWinScreen() {
	win_scrn.hidden = false;
	soundController.playSound("victory");
}
function closeWinScreen() {
	win_scrn.hidden = true;
	soundController.stopAllSounds();
}

const grandpa_death_gif = document.createElement("img");
grandpa_death_gif.src = "images/grandpa_death.gif";

function hideGif() {
	grandpa_death_gif.style.opacity = "0";
}

function showGif() {
	grandpa_death_gif.style.opacity = "1";
}

lose_btn.addEventListener("click", function () {
	if (lose_scrn.hidden) {
		showGif();
		lose_scrn.hidden = false;
		lose_scrn.append(grandpa_death_gif);
		soundController.playSound("death");
		setTimeout(hideGif, 2100);
	} else {
		lose_scrn.hidden = true;
	}
});

function displayLoseScreen() {
	if (lose_scrn.hidden) {
		lose_scrn.hidden = false;
		lose_scrn.append(grandpa_death_gif);
		soundController.playSound("death");
		setTimeout(hideGif, 2100);
	} else {
		lose_scrn.hidden = true;
	}
}

async function getAllPlayers() {
	return await routes.getAllPlayers();
}

async function createLeaderboards() {
	let players = await getAllPlayers();
	if (!players || players?.length === 0) return;
	for (let i = 0; i < players.length; i++) {
		const div1 = document.createElement("div");
		div1.className = "player-stat";
		div1.textContent = players[i]["screen_name"];
		lb_screen_name.append(div1);
		const div2 = document.createElement("div");
		div2.className = "player-stat";
		div2.textContent = players[i]["score"];
		lb_score.append(div2);
		const div3 = document.createElement("div");
		div3.className = "player-stat";
		div3.textContent = players[i]["time"];
		lb_time.append(div3);
		const div4 = document.createElement("div");
		div4.className = "player-stat";
		div4.textContent = players[i]["money"];
		lb_money.append(div4);
		const div5 = document.createElement("div");
		div5.className = "player-stat";
		div5.textContent = players[i]["co2_consumed"];
		lb_co2_consumed.append(div5);
		const div6 = document.createElement("div");
		div6.className = "player-stat";
		div6.textContent = players[i]["distance_traveled"];
		lb_distance_traveled.append(div6);
		const div7 = document.createElement("div");
		div7.className = "player-stat";
		div7.textContent = players[i]["real_time"];
		lb_real_time.append(div7);
	}
}

function hideStart() {
	title_screen.hidden = true;
}

// Fading animation for the start screen
title_screen.addEventListener("click", function () {
	title_screen.style.opacity = "0";
	setTimeout(hideStart, 1000);
	in_main_menu = true;
	options_menu.style.display = "flex";
	refreshText();
});

options_btn.addEventListener("click", function () {
	if (options_menu.style.display === "flex") {
		options_menu.style.display = "none";
	} else {
		quests_scrn.style.display = "none";
		options_menu.style.display = "flex";
	}
});

function newInput(id) {
	let inp = document.createElement("input");
	inp.type = "text";
	inp.id = "name" + String(id);
	inp.placeholder = "Player " + String(id) + " name";
	return inp;
}

new_game_btn.addEventListener("click", function () {
	hideBoxes();
	new_game_scrn.hidden = false;
});

let amount_of_players = 1;

minus_btn.addEventListener("click", function () {
	if (amount_of_players > 1) {
		const inputs = document.querySelector("#name" + amount_of_players);
		player_names.removeChild(inputs);
		amount_of_players -= 1;
		player_amount.textContent = String(amount_of_players);
	}
});

plus_btn.addEventListener("click", function () {
	amount_of_players += 1;
	player_amount.textContent = String(amount_of_players);
	player_names.append(newInput(amount_of_players));
});

start_btn.addEventListener("click", function () {
	main_menu.hidden = true;
	options_menu.style.display = "none";
	map_scrn.hidden = false;
	map_area.hidden = false;
	bottom_bar.style.display = "flex";
	options_btn.hidden = false;
	quests_btn.hidden = false;
	end_turn_btn.hidden = false;
	in_main_menu = false;
	game.startGame();
	setup();
});

load_save_btn.addEventListener("click", function () {
	if (!game.overlayDisabled) {
		hideBoxes();
		gameState.displaySavedGames();
		load_save_scrn.hidden = false;
	}
});

help_btn.addEventListener("click", function () {
	hideBoxes();
	help_scrn.hidden = false;
});

story_btn.addEventListener("click", function () {
	hideBoxes();
	buttons.hidden = true;
	story_scrn.hidden = false;
	dialog.setFullDialog(dialogScenes.intro);
});

close_dialog_btn.addEventListener("click", function () {
	buttons.hidden = false;
	story_scrn.hidden = true;
});

leaderboards_btn.addEventListener("click", function () {
	hideBoxes();
	leader_boards_scrn.hidden = false;
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
	if (in_main_menu) {
		title_screen.hidden = false;
		title_screen.style.opacity = "1";
		in_main_menu = false;
	}
});

quests_btn.addEventListener("click", function () {
	if (quests_scrn.style.display === "flex") {
		quests_scrn.style.display = "none";
	} else {
		options_menu.style.display = "none";
		quests_scrn.style.display = "flex";
	}
});

close_quests_btn.addEventListener("click", function () {
	quests_scrn.style.display = "none";
});

end_turn_btn.addEventListener("click", function () {
	game.nextPlayer();
});

function updateItems() {
	const player_items = [...game.currentPlayer().items];
	item_counter.textContent = String(player_items.length + "/4");
	if (player_items.length > 0) {
		for (let i = 0; i < player_items.length; i++) {
			if (player_items[i].id === "sauce") {
				sauce_image.src = "images/sauce.webp";
			} else if (player_items[i].id === "watch") {
				watch_image.src = "images/wristwatch.webp";
			} else if (player_items[i].id === "photo") {
				photo_image.src = "images/photo.webp";
			} else {
				coin_image.src = "images/coin.webp";
			}
		}
	}
}

function createHints() {
	const coin_item = game.grandpasHints.coin.item;
	const coin_hints = game.grandpasHints.coin.hints;
	for (let i = 0; i < coin_hints.length; i++) {
		const coin_city = game.grandpasHints.coin.cities[i].city;
		const hint = coin_hints[i];
		const styled_hint = translate(hint)
			.replace("[itmCol]", items[coin_item].color)
			.replace("[item]", translate(coin_item))
			.replace("[city]", coin_city);
		const pre = document.createElement("pre");
		pre.className = "hint";
		pre.append(dialog.parseTextFast(styled_hint));
		item_coin.append(pre);
	}
	const photo_item = game.grandpasHints.photo.item;
	const photo_hints = game.grandpasHints.photo.hints;
	for (let i = 0; i < photo_hints.length; i++) {
		const photo_city = game.grandpasHints.photo.cities[i].city;
		const hint = photo_hints[i];
		const styled_hint = translate(hint)
			.replace("[itmCol]", items[photo_item].color)
			.replace("[item]", translate(photo_item))
			.replace("[city]", photo_city);
		const pre = document.createElement("pre");
		pre.className = "hint";
		pre.append(dialog.parseTextFast(styled_hint));
		item_photo.append(pre);
	}
	const watch_item = game.grandpasHints.watch.item;
	const watch_hints = game.grandpasHints.watch.hints;
	for (let i = 0; i < watch_hints.length; i++) {
		const watch_city = game.grandpasHints.watch.cities[i].city;
		const hint = watch_hints[i];
		const styled_hint = translate(hint)
			.replace("[itmCol]", items[watch_item].color)
			.replace("[item]", translate(watch_item))
			.replace("[city]", watch_city);
		const pre = document.createElement("pre");
		pre.className = "hint";
		pre.append(dialog.parseTextFast(styled_hint));
		item_watch.append(pre);
	}
	const sauce_item = game.grandpasHints.sauce.item;
	const sauce_hints = game.grandpasHints.sauce.hints;
	for (let i = 0; i < sauce_hints.length; i++) {
		const sauce_city = game.grandpasHints.sauce.cities[i].city;
		const hint = sauce_hints[i];
		const styled_hint = translate(hint)
			.replace("[itmCol]", items[sauce_item].color)
			.replace("[item]", translate(sauce_item))
			.replace("[city]", sauce_city);
		const pre = document.createElement("pre");
		pre.className = "hint";
		pre.append(dialog.parseTextFast(styled_hint));
		item_sauce.append(pre);
	}
}

if (dev.enabled) {
	hideStart();
	in_main_menu = false;
	main_menu.hidden = true;
	options_menu.style.display = "none";
	options_open = false;
	bottom_bar.style.display = "flex";
	map_scrn.hidden = false;
	map_area.hidden = false;
	setup();
}

createLeaderboards();
player_names.append(newInput(1));
