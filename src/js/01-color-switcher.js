import '../css/common.css';

const body = document.querySelector("body");
const startBtn = document.querySelector("[data-start");
const stopBtn = document.querySelector("[data-stop");

let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener("click", onStartChangeBackgrondColor);

function onStartChangeBackgrondColor() {
  timerId = setInterval(changeBackgrondColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.addEventListener("click", onStopChangeBackgrondColor);

function onStopChangeBackgrondColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

function changeBackgrondColor() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
