const gamediv = document.querySelector("#game");
const mainmenu = document.querySelector("#mainmenu");
const startbutton = document.querySelector("#startGame");
const loadbutton = document.querySelector("#loadGame");
const helpbutton = document.querySelector("#readHelp");
const storybutton  = document.querySelector("#readStory");

startbutton.addEventListener("click", function(evt) {
  console.log("Start");
  mainmenu.style.display = "none";
  gamediv.hidden = false;
});