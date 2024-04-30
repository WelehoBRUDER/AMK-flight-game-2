const mapdiv = document.querySelector("#map");
const mainmenu = document.querySelector("#mainmenu");
const buttons = document.querySelector("#buttons");
const startbutton = document.querySelector("#startGame");
const loadbutton = document.querySelector("#loadGame");
const helpbutton = document.querySelector("#readHelp");
const storybutton  = document.querySelector("#readStory");

startbutton.addEventListener("click", function(evt) {
  console.log("Start");
  mainmenu.style.display = "none";
  mapdiv.style.display = "block";
});