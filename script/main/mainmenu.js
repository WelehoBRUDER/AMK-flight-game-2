const maparea = document.querySelector("#map-area");
const mapscreen = document.querySelector("#map");

const optionsmenu = document.querySelector("#option-menu");
const buttons = document.querySelector("#buttons");
const startscreen = document.querySelector("#start-screen");
const loadscreen = document.querySelector("#load-screen");
const helpscreen = document.querySelector("#help-screen");
const storyscreen = document.querySelector("#story-screen");

const optionbutton = document.querySelector("#option-button");
const newgamebutton = document.querySelector("#new-game");
const startbutton = document.querySelector("#start-game");
const loadbutton = document.querySelector("#load-game");
const helpbutton = document.querySelector("#read-help");
const storybutton = document.querySelector("#read-story");
const closedialog = document.querySelector("#close-dialog");
const musicbutton = document.querySelector("#music");
const closebutton = document.querySelector("#close");

let optionsopen = false;

function hideBoxes() {
	startscreen.hidden = true;
	loadscreen.hidden = true;
	helpscreen.hidden = true;
	storyscreen.hidden = true;
}

document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
			soundController.playSound("click", true)
		});
});

optionbutton.addEventListener("click", function() {
	if (optionsopen) {
		optionsmenu.style.display = "none";
		optionsopen = false;
	} else {
		optionsmenu.style.display = "flex"
		optionsopen = true;
	}
})

newgamebutton.addEventListener("click", function() {
	hideBoxes();
	startscreen.hidden = false;
})

startbutton.addEventListener("click", function() {
	optionsmenu.style.display = "none";
	mapscreen.hidden = false;
	maparea.hidden = false;
	setup();
})

loadbutton.addEventListener("click", function() {
	hideBoxes();
	loadscreen.hidden = false;
})

helpbutton.addEventListener("click", function() {
	hideBoxes();
	helpscreen.hidden = false;
})

storybutton.addEventListener("click", function() {
	hideBoxes();
	buttons.hidden = true;
	storyscreen.hidden = false;
})

closedialog.addEventListener("click", function() {
	buttons.hidden = false;
	storyscreen.hidden = true;
})

musicbutton.addEventListener("click", function() {
	if (soundController.isMusicPlaying()) {
  	soundController.pauseMusic();
		musicbutton.textContent = "Music: OFF";
	} else {
		soundController.playSound("shanty");
		musicbutton.textContent = "Music: ON";
	}
})

closebutton.addEventListener("click", function() {
	optionsmenu.style.display = "none";
	optionsopen = false;
})

closedialog.addEventListener("click", function() {
})