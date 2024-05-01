const maparea = document.querySelector("#map-area");
const mapscreen = document.querySelector("#map");
const dialogbox = document.querySelector("#dialog-box");

const mainmenu = document.querySelector("#mainmenu");
const helpscreen = document.querySelector("#helpscreen");

const startbutton = document.querySelector("#startgame");
const loadbutton = document.querySelector("#loadgame");
const helpbutton = document.querySelector("#readhelp");
const storybutton = document.querySelector("#readstory");
const returnbutton = document.querySelector("#return");
const closebutton = document.querySelector("#close-dialog");


startbutton.addEventListener("click", function () {
	mainmenu.hidden = true;
	helpscreen.hidden = true;
	maparea.hidden = false;
	mapscreen.hidden = false;
	setup();
})

helpbutton.addEventListener("click", function() {
	mainmenu.hidden = true;
	mapscreen.hidden = true;
	helpscreen.hidden = false;
})

returnbutton.addEventListener("click", function() {
	helpscreen.hidden = true;
	mainmenu.hidden = false;
	mapscreen.hidden = false;
})

storybutton.addEventListener("click", function() {
	dialogbox.style.display = "flex";
	closebutton.hidden = false;
})

closebutton.addEventListener("click", function() {
	dialogbox.style.display = "none";
	closebutton.hidden = true;
})