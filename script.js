'use strict';


let spring = {
  name: 'Spring',
  phases: ['🌐 Diplomacy', '📝 Order Writing', '💣 Order Resolution', '💀 Retreat/Disband']
}
let fall = {
  name: 'Fall',
  phases: ['🌐 Diplomacy', '📝 Order Writing', '💣 Order Resolution', '💀 Retreat/Disband', '🚧 Build/Loss']
}
let season = spring;
let seasonName = season.name;
let phaseInd = 0;
let phase = season.phases[phaseInd];
let year = 1901;
let nextPhaseButton = document.getElementById("nextPhaseButton");
let resetButton = document.getElementById("resetButton");

\
function updateTurnDisplay() {
    document.getElementById("turnDisplay").innerText = `${season.name} ${year}`;
    document.getElementById('phaseDisplay').innerText = `${phase} Phase`;
}

// Example function to update the turn, you can call this function to change the turn
function nextTurn() {
    if (season.name === "Spring" && phase === spring.phases[3]) {
        season = fall;
        phaseInd = 0;
        phase = season.phases[phaseInd];
        console.log(phaseInd);
    } else if (season.name === 'Fall' && phase === fall.phases[4]) {
        season = spring;
        phaseInd = 0;
        phase = season.phases[phaseInd];
        year++;
    } else {
      phaseInd++;
      phase = season.phases[phaseInd];
      console.log(phaseInd);
    }
    updateTurnDisplay();
}
function resetGame() {
  document.getElementById("englandCP").value = 3;
  document.getElementById("franceCP").value = 3;
  document.getElementById("germanyCP").value = 3;
  document.getElementById("italyCP").value = 3;
  document.getElementById("austriaCP").value = 3;
  document.getElementById("russiaCP").value = 4;
  document.getElementById("turkeyCP").value = 3;
  year = 1901;
  season = spring;
  phaseInd = 0;
  phase = season.phases[phaseInd];
  updateTurnDisplay();
}

updateTurnDisplay(); // Initial display

nextPhaseButton.addEventListener("click", nextTurn);
resetButton.addEventListener("click", resetGame);