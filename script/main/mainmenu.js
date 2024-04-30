const mainmenudiv = document.querySelector("#mainmenu");
const gamediv = document.querySelector("#game");
const startbutton = document.querySelector("#startGame");
const loadbutton = document.querySelector("#loadGame");
const helpbutton = document.querySelector("#readHelp");
const storybutton  = document.querySelector("#readStory");

startbutton.addEventListener("click", function(evt) {
  mainmenudiv.style.display = "none";
  gamediv.hidden = false;
});