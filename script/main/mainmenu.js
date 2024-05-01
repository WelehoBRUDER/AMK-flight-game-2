const maparea = document.querySelector("#map-area");
const mapscreen = document.querySelector("#map");
const dialogbox = document.querySelector("#dialog-box");

const mainmenu = document.querySelector("#mainmenu");
const helpscreen = document.querySelector("#helpscreen");

const startbutton = document.querySelector("#startgame");
const loadbutton = document.querySelector("#loadgame");
const helpbutton = document.querySelector("#readhelp");
const storybutton = document.querySelector("#readstory");
const musicbutton = document.querySelector("#music");
const returnbutton = document.querySelector("#return");
const closebutton = document.querySelector("#close-dialog");

const click = new Audio("sounds/click.mp3");
const shanty = new Audio("sounds/seashanty2.mp3");
click.load();
shanty.load();

let audioplaying = false;

function playAudio(src, volume) {
	src.volume = volume;
	src.play();
}

function playMusic(src, volume) {
	src.volume = volume;
	src.loop = true;
	src.play();
}

startbutton.addEventListener("click", function () {
	playAudio(click, 0.3);
	mainmenu.hidden = true;
	helpscreen.hidden = true;
	maparea.hidden = false;
	mapscreen.hidden = false;
	setup();
})

helpbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	mainmenu.hidden = true;
	mapscreen.hidden = true;
	helpscreen.hidden = false;
})

returnbutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	helpscreen.hidden = true;
	mainmenu.hidden = false;
	mapscreen.hidden = false;
})

storybutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	dialogbox.style.display = "flex";
	closebutton.hidden = false;
})

closebutton.addEventListener("click", function() {
	playAudio(click, 0.3);
	dialogbox.style.display = "none";
	closebutton.hidden = true;
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