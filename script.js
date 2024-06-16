'use strict';

let spring = {
  name: 'Spring',
  phases: [
    '🌐 Diplomacy',
    '📝 Order Writing',
    '💣 Order Resolution',
    '💀 Retreat/Disband',
  ],
};
let fall = {
  name: 'Fall',
  phases: [
    '🌐 Diplomacy',
    '📝 Order Writing',
    '💣 Order Resolution',
    '💀 Retreat/Disband',
    '🚧 Build/Loss',
  ],
};
let season = spring;
let seasonName = season.name;
let phaseInd = 0;
let phase = season.phases[phaseInd];
let year = 1901;
const nextPhaseButton = document.getElementById('nextPhaseButton');
const resetButton = document.getElementById('resetButton');
const england = document.getElementById('englandCP');
const france = document.getElementById('franceCP');
const germany = document.getElementById('germanyCP');
const italy = document.getElementById('italyCP');
const austria = document.getElementById('austriaCP');
const russia = document.getElementById('russiaCP');
const turkey = document.getElementById('turkeyCP');
const nations = [england, france, germany, italy, austria, russia, turkey];
let timeRemaining = 0;
let timeInterval;
let startTimerButton = document.getElementById('startTimerButton');
const timers = new Map([
  ['diplo', 14],
  ['write', 4],
  ['resol', 8],
  ['build', 5],
]);
const timerSound = document.getElementById('timerSound');

function updateTurnDisplay() {
  document.getElementById('turnDisplay').innerText = `${season.name} ${year}`;
  document.getElementById('phaseDisplay').innerText = `${phase} Phase`;
}
function winScreen() {}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById('timerDisplay').innerText = `${String(
    minutes
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timeInterval);
  setTimer();
  updateTimerDisplay();
  timeInterval = setInterval(updateTimer, 1000);
}
function updateTimer() {
  if (timeRemaining <= 0) {
    clearInterval(timeInterval);
    timerSound.play();
    setTimeout(timerSound.stop(), 5000);
  } else {
    timeRemaining--;
    if (!timeInterval) {
      timeInterval = setInterval(updateTimer, 1000);
    }
  }
  updateTimerDisplay();
}

function setTimer() {
  switch (phase) {
    case '🌐 Diplomacy':
      timeRemaining = timers.get('diplo') * 60;
      break;
    case '📝 Order Writing':
      timeRemaining = timers.get('write') * 60;
      break;
    case '💣 Order Resolution':
      timeRemaining = timers.get('resol') * 60;
      break;
    case '💀 Retreat/Disband':
      break;
    case '🚧 Build/Loss':
      timeRemaining = timers.get('build') * 60;
      break;
  }
}

function checkWin() {
  for (let nation of nations) {
    if (nation.value === 18) {
      winScreen();
    }
  }
}

// Example function to update the turn, you can call this function to change the turn
function nextTurn() {
  checkWin();
  if (season.name === 'Spring' && phase === spring.phases[3]) {
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
  clearInterval(timeInterval);
  setTimer();
  updateTurnDisplay();
  updateTimerDisplay();
}
function resetGame() {
  england.value = 3;
  france.value = 3;
  germany.value = 3;
  italy.value = 3;
  austria.value = 3;
  russia.value = 4;
  turkey.value = 3;
  year = 1901;
  season = spring;
  phaseInd = 0;
  phase = season.phases[phaseInd];
  clearInterval(timeInterval);
  setTimer();
  updateTurnDisplay();
  updateTimerDisplay();
}

clearInterval(timeInterval);
setTimer();
updateTurnDisplay();
updateTimerDisplay(); // Initial display

nextPhaseButton.addEventListener('click', nextTurn);
resetButton.addEventListener('click', resetGame);
startTimerButton.addEventListener('click', startTimer);
