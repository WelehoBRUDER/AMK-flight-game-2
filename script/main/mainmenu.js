const maparea = document.querySelector("#map-area");
const mapscreen = document.querySelector("#map");

const optionbutton = document.querySelector("#option-button");
const optionsmenu = document.querySelector("#option-menu");

const newgamebutton = document.querySelector("#new-game");
const loadbutton = document.querySelector("#load-game");
const helpbutton = document.querySelector("#read-help");
const storybutton = document.querySelector("#read-story");
const musicbutton = document.querySelector("#music");
const closebutton = document.querySelector("#close");
const closedialog = document.querySelector("#close-dialog");
const startbutton = document.querySelector("#start-game");

const startscreen = document.querySelector("#start-screen");
const loadscreen = document.querySelector("#load-screen");
const helpscreen = document.querySelector("#help-screen");
const storyscreen = document.querySelector("#story-screen");

let optionsopen = false;

function hideBoxes() {
	startscreen.hidden = true;
	loadscreen.hidden = true;
	helpscreen.hidden = true;
	storyscreen.hidden = true;
}

optionbutton.addEventListener("click", function() {
	soundController.playSound("click");
	if (optionsopen) {
		optionsmenu.style.display = "none";
		optionsopen = false;
	} else {
		optionsmenu.style.display = "flex"
		optionsopen = true;
	}
})

newgamebutton.addEventListener("click", function() {
	soundController.playSound("click");
	hideBoxes();
	startscreen.hidden = false;
})

startbutton.addEventListener("click", function() {
	soundController.playSound("click");
	mapscreen.hidden = false;
	maparea.hidden = false;
	setup();
})

loadbutton.addEventListener("click", function() {
	soundController.playSound("click");
	hideBoxes();
	loadscreen.hidden = false;
})

helpbutton.addEventListener("click", function() {
	soundController.playSound("click");
	hideBoxes();
	helpscreen.hidden = false;
})

storybutton.addEventListener("click", function() {
	soundController.playSound("click");
	hideBoxes();
	storyscreen.hidden = false;
})

musicbutton.addEventListener("click", function() {
	soundController.playSound("click");
})

closebutton.addEventListener("click", function() {
	soundController.playSound("click");
	optionsmenu.style.display = "none";
	optionsopen = false;
})

closedialog.addEventListener("click", function() {
	soundController.playSound("click");
})