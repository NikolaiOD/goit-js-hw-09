import '../css/common.css';
// Import all modules Notiflix 
import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let delayInInput = +form.delay.value;
  let stepInInput = +form.step.value;
  let amountInInput = +form.amount.value;

  for (let i = 1; i <= amountInInput; i += 1) {
    createPromise(i, delayInInput)
    .then(onSuccess)
    .catch(onError);

    delayInInput += stepInInput;
  };

  Notiflix.Notify.info("I'm start working!");
  e.currentTarget.reset();
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
};

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
