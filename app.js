"use strict";
//* app variables
const mainPart = document.querySelector(".main-part");
const leftHeadButtons = document.querySelector(".head-btn-left");
const optionsBtn = document.querySelector(".options");
const reloadBtn = document.querySelector(".reload");

const rigthHeadButtons = document.querySelector(".head-btn-right");
const infoBtn = document.querySelector(".info");
const soundOnBtn = document.querySelector(".sound-on");
const soundOffBtn = document.querySelector(".sound-off");

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
const endAudio = document.querySelector(".end-audio");

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
let isMuted = false;

//* Functions
const defineVar = function () {
  workTime = document.querySelector("#work-time").value * 60000;
  shortBreakTime = document.querySelector("#short-break-time").value * 60000;
  longBreakTime = document.querySelector("#long-break-time").value * 60000;
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
  document.body.style.setProperty("--duration", "");
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
const style = getComputedStyle(document.body);
const animationFunc = function (color, duration, name) {
  document.body.style.setProperty("--color", color);
  document.body.style.setProperty("--duration", duration);
  document.body.style.setProperty("--name", name);
  console.log(style.getPropertyValue("--duration"));
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
const pomodoro = function (work, shortBreak, longBreak, round) {
  !isMuted ? focusAudio.play() : isMuted;
  animationFunc("#F9D923", `${work}ms`, "countdown1");
  workStatus.textContent = "Focus Time";
  timeDesigner(work);
  w = setInterval(() => {
    work -= 1000;
    // console.log("click1");
    timeDesigner(work);
    if (work === 0) {
      clearInterval(w);
      roundCounter++;
      addRound(round, roundCounter);
      if (roundCounter == round) {
        finalTab.classList.remove("hidden");
        !isMuted ? endAudio.play() : isMuted;
        isMuted = true;
      }
      if (roundCounter % 4 !== 0) {
        !isMuted ? shortBreakAudio.play() : isMuted;
        animationFunc("#36AE7C", `${shortBreak}ms`, "countdown2");
        workStatus.textContent = "Short Break";
        timeDesigner(shortBreak);
        s = setInterval(() => {
          shortBreak -= 1000;
          // console.log("click2");
          timeDesigner(shortBreak);
          shortBreak === 0 ? clearInterval(s) : shortBreak;
          shortBreak === 0
            ? pomodoro(workTime, shortBreakTime, longBreakTime, roundTime)
            : shortBreak;
        }, 1000);
      } else {
        !isMuted ? longBreakAudio.play() : isMuted;
        animationFunc("#187498", `${longBreak}ms`, "countdown3");
        workStatus.textContent = "Long Break";
        timeDesigner(longBreak);
        l = setInterval(() => {
          longBreak -= 1000;
          // console.log("click3");
          timeDesigner(longBreak);
          longBreak < 300 ? clearInterval(l) : longBreak;
          longBreak < 300
            ? pomodoro(workTime, shortBreakTime, longBreakTime, roundTime)
            : longBreak;
        }, 1000);
      }
    }
  }, 1000);
};
//* Start Button
startBtn.addEventListener("click", (e) => {
  pomodoro(workTime, shortBreakTime, longBreakTime, roundTime);
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  isStart = true;
});

//* Stop Button
stopBtn.addEventListener("click", (e) => {
  clearInterval(w);
  clearInterval(s);
  clearInterval(l);
  setDefaults();
  defineVar();
});
// //* Options-Reload Buttons
// leftHeadButtons.addEventListener("click", (e) => {
//   if (e.target.classList.contains("options")) {
//     appTab.classList.toggle("hidden");
//     optionTab.classList.toggle("hidden");
//     mainPart.classList.remove("hidden");
//     infoTab.classList.add("hidden");
//   } else if (e.target.classList.contains("reload")) {
//     infoTab.classList.add("hidden");
//     clearInterval(w);
//     clearInterval(s);
//     clearInterval(l);
//     clearInterval(interval);
//     setDefaults();
//     defineVar();
//   }
// });

//* Info-Dark Mode Buttons
rigthHeadButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("options")) {
    appTab.classList.toggle("hidden");
    optionTab.classList.toggle("hidden");
    infoTab.classList.add("hidden");
  } else if (e.target.classList.contains("info")) {
    infoTab.classList.toggle("hidden");
  } else if (e.target.classList.contains("sound-on")) {
    soundOffBtn.classList.remove("hidden");
    soundOnBtn.classList.add("hidden");
    isMuted = true;
  } else if (e.target.classList.contains("sound-off")) {
    soundOnBtn.classList.remove("hidden");
    soundOffBtn.classList.add("hidden");
    isMuted = false;
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
    addRound(roundTime, roundCounter);
  } else if (e.target.classList.contains("refresh")) {
    document.querySelector("#work-time").value = defaultWorkTime;
    document.querySelector("#short-break-time").value = defaultShortBrakeTime;
    document.querySelector("#long-break-time").value = defaultLongBreakTime;
    document.querySelector("#round-time").value = defaultRoundTime;
  }
});

//* Final Tab
finalTab.addEventListener("mouseover", (e) => {
  isMuted = false;
  finalTab.classList.add("hidden");
  infoTab.classList.add("hidden");
  appTab.classList.remove("hidden");
  optionTab.classList.add("hidden");
  clearInterval(w);
  clearInterval(s);
  clearInterval(l);
  setDefaults();
  defineVar();
});
defineVar();
