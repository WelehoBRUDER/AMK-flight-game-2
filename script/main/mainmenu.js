const gamescreen = document.querySelector("#game");
const mainmenu = document.querySelector("#mainmenu");
const helpscreen = document.querySelector("#helpscreen");

const startbutton = document.querySelector("#startGame");
const loadbutton = document.querySelector("#loadGame");
const helpbutton = document.querySelector("#readHelp");
const storybutton = document.querySelector("#readStory");
const returnbutton = document.querySelector("#return");

startbutton.addEventListener("click", function () {
	mainmenu.hidden = true;
	gamescreen.hidden = false;
	setup();
})

helpbutton.addEventListener("click", function() {
	helpscreen.hidden = false;
})

returnbutton.addEventListener("click", function() {
	helpscreen.hidden = true;
})