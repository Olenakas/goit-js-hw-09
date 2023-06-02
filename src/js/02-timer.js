import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

const timerInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');

let interval = null;

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};
const startCountdown = () => {
  const selectedDate = new Date(timerInput.value).getTime();
  const currentDate = new Date().getTime();
  let countdown = selectedDate - currentDate;

  if (countdown <= 0) {
    Notiflix.Notify.failure('Please choose a future date');
    return;
  }

  clearInterval(interval);
  interval = setInterval(() => {
    if (countdown <= 0) {
      clearInterval(interval);
      timerInput.disabled = false;
      return;
    }

    const remainingTime = convertMs(countdown);
    daysField.textContent = addLeadingZero(remainingTime.days);
    hoursField.textContent = addLeadingZero(remainingTime.hours);
    minutesField.textContent = addLeadingZero(remainingTime.minutes);
    secondsField.textContent = addLeadingZero(remainingTime.seconds);

    countdown -= 1000;
  }, 1000);

  timerInput.disabled = true;
};
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
      return;
    }

    startButton.disabled = false;
  },
});

startButton.addEventListener('click', startCountdown);
