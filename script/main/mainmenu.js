const maparea = document.querySelector("#map-area");
const mapscreen = document.querySelector("#map");
const dialogbox = document.querySelector("#dialog-box");

const optionbutton = document.querySelector("#option-button");
const optionsmenu = document.querySelector("#option-menu");

const startbutton = document.querySelector("#startgame");
const loadbutton = document.querySelector("#loadgame");
const helpbutton = document.querySelector("#readhelp");
const storybutton = document.querySelector("#readstory");
const musicbutton = document.querySelector("#music");
const closebutton = document.querySelector("#close");

const closedialog = document.querySelector("#close-dialog");

let optionsopen = false;

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

startbutton.addEventListener("click", function() {
	soundController.playSound("click");
	mapscreen.hidden = false;
	maparea.hidden = false;
	setup();
})

loadbutton.addEventListener("click", function() {
	soundController.playSound("click");
})

helpbutton.addEventListener("click", function() {
	soundController.playSound("click");
})

storybutton.addEventListener("click", function() {
	soundController.playSound("click");
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