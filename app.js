"use strict";
//* app variables
const mainPart = document.querySelector(".main-part");
const leftHeadButtons = document.querySelector(".head-btn-left");
const optionsBtn = document.querySelector(".options");
const reloadBtn = document.querySelector(".reload");

const rigthHeadButtons = document.querySelector(".head-btn-right");
const infoBtn = document.querySelector(".info");
const darkModeBtn = document.querySelector(".dark-mode");

const appTab = document.querySelector(".app-tab");
const timer = document.querySelector(".time");
const workStatus = document.querySelector(".status");
const round = document.querySelector(".round");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");

const optionTab = document.querySelector(".option-tab");
const optionTabButtons = document.querySelector(".option-btn");
const doneBtn = document.querySelector(".done");
const refreshBtn = document.querySelector(".refresh");
const closeBtn = document.querySelector(".close");

const infoTab = document.querySelector(".info-tab");
const finalTab = document.querySelector(".final-tab");
const animation = document.querySelector(".animation");

const focusAudio = document.querySelector(".focus-time-audio");
const shortBreakAudio = document.querySelector(".short-break-audio");
const longBreakAudio = document.querySelector(".long-break-audio");

//* Options Tab Variables
const defaultWorkTime = 25;
const defaultShortBrakeTime = 5;
const defaultLongBreakTime = 15;
const defaultRoundTime = 4;
let workTime;
let shortBreakTime;
let longBreakTime;
let roundTime;
let roundCounter = 0;
let isStart = false;

//* Functions
const defineVar = function () {
  workTime = document.querySelector("#work-time").value * 60000 + 1000;
  shortBreakTime =
    document.querySelector("#short-break-time").value * 60000 + 1000;
  longBreakTime =
    document.querySelector("#long-break-time").value * 60000 + 1000;
  roundTime = document.querySelector("#round-time").value;
  addRound(roundTime, roundCounter);
};
const setDefaults = function () {
  document.querySelector("#work-time").value = defaultWorkTime;
  document.querySelector("#short-break-time").value = defaultShortBrakeTime;
  document.querySelector("#long-break-time").value = defaultLongBreakTime;
  document.querySelector("#round-time").value = defaultRoundTime;
  workStatus.textContent = "Status";
  roundCounter = 0;
  timer.textContent = "00:00";
  document.body.style.setProperty("--name", "");
  document.body.style.setProperty("--color", "");
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  isStart = false;
};
const addRound = function (roundTime, roundCounter) {
  round.innerHTML = "";
  for (let i = 0; i < roundCounter; i++) {
    const newRound = document.createElement("div");
    newRound.classList.add("round-style");
    newRound.innerHTML =
      '<img src="./icons/shield-checkmark-outline.svg" alt="" />';
    round.append(newRound);
  }
  for (let i = 0; i < roundTime - roundCounter; i++) {
    const newRound = document.createElement("div");
    newRound.classList.add("round-style");
    newRound.innerHTML = '<img src="./icons/ellipse-outline.svg" alt="">';
    round.append(newRound);
  }
};
const animationFunc = function (color, duration, name) {
  document.body.style.setProperty("--color", color);
  document.body.style.setProperty("--duration", duration);
  document.body.style.setProperty("--name", name);
};

const timeDesigner = function (time) {
  timer.textContent = new Intl.DateTimeFormat("tr-TR", {
    minute: "2-digit",
    second: "2-digit",
  }).format(time);
};

//* Timer
let w;
let s;
let l;
let interval;
const pomodoro = function (workTime, shortBreak, longBreak, round) {
  focusAudio.play();
  w = setInterval(() => {
    workStatus.textContent = "Focus Time";
    animationFunc("#F9D923", "1501s", "countdown1");
    workTime -= 1000;
    timeDesigner(workTime);

    if (workTime === 0) {
      clearInterval(w);
      roundCounter++;
      addRound(round, roundCounter);
      if (roundCounter == round) {
        clearInterval(interval);
        finalTab.classList.remove("hidden");
        appTab.style.visibility = "hidden";
        optionTab.style.visibility = "hidden";
        infoTab.style.visibility = "hidden";
      }

      if (roundCounter % 4 !== 0) {
        shortBreakAudio.play();
        s = setInterval(() => {
          workStatus.textContent = "Short Break";
          animationFunc("#36AE7C", "301s", "countdown2");
          shortBreak -= 1000;
          timeDesigner(shortBreak);
          shortBreak === 0 ? clearInterval(s) : shortBreak;
        }, 1000);
      } else {
        longBreakAudio.play();
        l = setInterval(() => {
          workStatus.textContent = "Long Break";
          animationFunc("#187498", "901s", "countdown3");
          longBreak -= 1000;
          timeDesigner(longBreak);
          longBreak === 0 ? clearInterval(l) : longBreak;
        }, 1000);
      }
    }
  }, 1000);
};
const intervalFunc = function () {
  pomodoro(workTime, shortBreakTime, longBreakTime, roundTime);
};

//* Start Button
startBtn.addEventListener("click", (e) => {
  pomodoro(workTime, shortBreakTime, longBreakTime, roundTime);
  interval = setInterval(intervalFunc, workTime + shortBreakTime);
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  isStart = true;
});

//* Stop Button
stopBtn.addEventListener("click", (e) => {
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  clearInterval(w);
  clearInterval(s);
  clearInterval(l);
  clearInterval(interval);
  setDefaults();
  defineVar();
});
//* Options-Reload Buttons
leftHeadButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("options")) {
    appTab.classList.toggle("hidden");
    optionTab.classList.toggle("hidden");
    mainPart.classList.remove("hidden");
    infoTab.classList.add("hidden");
  } else if (e.target.classList.contains("reload")) {
    infoTab.classList.add("hidden");
    clearInterval(w);
    clearInterval(s);
    clearInterval(l);
    clearInterval(interval);
    setDefaults();
    defineVar();
  }
});

//* Info-Dark Mode Buttons
rigthHeadButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("info")) {
    infoTab.classList.toggle("hidden");
  } else if (e.target.classList.contains("dark-mode")) {
    console.log("dark mode clicked");
    // document.querySelector(".timer").classList.toggle("dark");
  }
});

//* Options Tab Done-Cancel-Refresh Button
optionTabButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("done") && !isStart) {
    appTab.classList.toggle("hidden");
    optionTab.classList.toggle("hidden");
    defineVar();
    round.innerHTML = "";
    addRound(roundTime, roundCounter);
  } else if (e.target.classList.contains("done")) {
    appTab.classList.remove("hidden");
    optionTab.classList.add("hidden");
  } else if (e.target.classList.contains("close")) {
    appTab.classList.toggle("hidden");
    optionTab.classList.toggle("hidden");
    round.innerHTML = "";
    addRound(roundTime, roundCounter);
  } else if (e.target.classList.contains("refresh")) {
    setDefaults();
  }
});

//* Final Tab
finalTab.addEventListener("mouseover", (e) => {
  finalTab.classList.add("hidden");
  appTab.style.visibility = "visible";
  optionTab.style.visibility = "visible";
  infoTab.style.visibility = "visible";
  appTab.classList.remove("hidden");
  optionTab.classList.add("hidden");
  infoTab.classList.add("hidden");
  clearInterval(w);
  clearInterval(s);
  clearInterval(l);
  clearInterval(interval);
  setDefaults();
  defineVar();
});
defineVar();
