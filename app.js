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
const pauseBtn = document.querySelector(".pause");

const optionTab = document.querySelector(".option-tab");
const optionTabButtons = document.querySelector(".option-btn");
const doneBtn = document.querySelector(".done");
const refreshBtn = document.querySelector(".refresh");
const closeBtn = document.querySelector(".close");

const infoTab = document.querySelector(".info-tab");
const finalTab = document.querySelector(".final-tab");

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

const defineVar = function () {
  workTime = document.querySelector("#work-time").value * 1000 + 1000;
  shortBreakTime =
    document.querySelector("#short-break-time").value * 1000 + 1000;
  longBreakTime =
    document.querySelector("#long-break-time").value * 1000 + 1000;
  roundTime = document.querySelector("#round-time").value;
  addRound(roundTime, roundCounter);
};
const setDefaults = function () {
  document.querySelector("#work-time").value = defaultWorkTime;
  document.querySelector("#short-break-time").value = defaultShortBrakeTime;
  document.querySelector("#long-break-time").value = defaultLongBreakTime;
  document.querySelector("#round-time").value = defaultRoundTime;
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

//* Timer
let w;
let s;
let l;
let interval;
const pomodoro = function (workTime, shortBreak, longBreak, round) {
  w = setInterval(() => {
    workStatus.textContent = "Working";
    workTime -= 1000;
    timer.textContent = new Intl.DateTimeFormat("tr-TR", {
      minute: "2-digit",
      second: "2-digit",
    }).format(workTime);

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
        s = setInterval(() => {
          workStatus.textContent = "Short Break";
          shortBreak -= 1000;
          timer.textContent = new Intl.DateTimeFormat("tr-TR", {
            minute: "2-digit",
            second: "2-digit",
          }).format(shortBreak);

          shortBreak === 0 ? clearInterval(s) : shortBreak;
        }, 1000);
      } else {
        l = setInterval(() => {
          workStatus.textContent = "Long Break";
          longBreak -= 1000;
          timer.textContent = new Intl.DateTimeFormat("tr-TR", {
            minute: "2-digit",
            second: "2-digit",
          }).format(longBreak);
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
});

//* Options-Reload Buttons
leftHeadButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("options")) {
    appTab.classList.toggle("hidden");
    optionTab.classList.toggle("hidden");
    mainPart.classList.remove("hidden");
    infoTab.classList.add("hidden");
  } else if (e.target.classList.contains("reload")) {
    clearInterval(w);
    clearInterval(s);
    clearInterval(l);
    clearInterval(interval);
    workStatus.textContent = "Pomodoro";
    roundCounter = 0;
    timer.textContent = "00:00";
    setDefaults();
    defineVar();
  }
});

//* Info-Dark Mode Buttons
rigthHeadButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("info")) {
    console.log("info clicked");
    infoTab.classList.toggle("hidden");
    mainPart.classList.toggle("hidden");
  } else if (e.target.classList.contains("dark-mode")) {
    console.log("dark mode clicked");
    // document.querySelector(".timer").classList.toggle("dark");
  }
});

//* Options Tab Done-Cancel-Refresh Button
optionTabButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("done")) {
    appTab.classList.toggle("hidden");
    optionTab.classList.toggle("hidden");
    defineVar();
    round.innerHTML = "";
    addRound(roundTime, roundCounter);
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
  workStatus.textContent = "Pomodoro";
  roundCounter = 0;
  timer.textContent = "00:00";
  setDefaults();
  defineVar();
});
defineVar();