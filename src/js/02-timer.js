import '../css/common.css';
// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
// Import all modules Notiflix 
import Notiflix from 'notiflix';

const refs = {
  inputBtn: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

refs.startBtn.disabled = true;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    } else {
      Notiflix.Notify.success("Date is correct, press 'Start' to begin countdown");
      refs.startBtn.disabled = false;
      countDown();
    }
  },
};

function countDown() {
  const dateDiference = fp.selectedDates[0] - Date.now();
  const { days, hours, minutes, seconds } = convertMs(dateDiference);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
  if (seconds <= 0) {
    Notiflix.Notify.info("Time is over!");
    clearInterval(intervalID);
  }
};

let fp = flatpickr(refs.inputBtn, options);

refs.startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  Notiflix.Notify.success("Countdown is start working!");
  refs.startBtn.disabled = true;
  intervalID = setInterval(() => {
    countDown(), 1000;
  });
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};
