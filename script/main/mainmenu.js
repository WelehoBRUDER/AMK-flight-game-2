const maparea = document.querySelector("#map-area");
const mapscreen = document.querySelector("#map");
const dialogbox = document.querySelector("#dialog-box");

const mainmenu = document.querySelector("#mainmenu");
const startscreen = document.querySelector("#startscreen");
const helpscreen = document.querySelector("#helpscreen");
const loadscreen = document.querySelector("#loadscreen");

const optionbutton = document.querySelector("#option-button");
const optionsmenu = document.querySelector("#option-menu");

const startbutton = document.querySelector("#startgame");
const startreturn = document.querySelector("#startreturn");
const loadbutton = document.querySelector("#loadgame");
const loadreturn = document.querySelector("#loadreturn");
const helpbutton = document.querySelector("#readhelp");
const storybutton = document.querySelector("#readstory");
const musicbutton = document.querySelector("#music");
const helpreturn = document.querySelector("#helpreturn");
const closebutton = document.querySelector("#close-dialog");

const click = new Audio("sounds/click.mp3");
const shanty = new Audio("sounds/seashanty2.mp3");
click.load();
shanty.load();

let audioplaying = false;
let optionsopen = false;

function playAudio(src, volume) {
	src.volume = volume;
	src.play();
}

function playMusic(src, volume) {
	src.volume = volume;
	src.loop = true;
	src.play();
}

optionbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	if (optionsopen) {
		optionsmenu.hidden = true;
		optionsopen = false;
	} else {
		optionsmenu.hidden = false;
		optionsopen = true;
	}
})

startbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	mapscreen.hidden = false;
	maparea.hidden = false;
	setup();
})

startreturn.addEventListener("click", function() {
	playAudio(click, 0.3);
})

loadbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
})

loadreturn.addEventListener("click", function() {
	playAudio(click, 0.3);
})

helpbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
})

helpreturn.addEventListener("click", function() {
	playAudio(click, 0.3);
})

storybutton.addEventListener("click", function() {
	playAudio(click, 0.3);
})

closebutton.addEventListener("click", function() {
	playAudio(click, 0.3);
})

musicbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	if (audioplaying) {
		playMusic(shanty, 0);
		audioplaying = false;
	} else {
		playMusic(shanty, 0.2);
		audioplaying = true;
	}
})