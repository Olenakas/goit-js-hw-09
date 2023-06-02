import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

const timerInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;

let interval;

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

const updateInterface = time => {
  daysField.textContent = addLeadingZero(time.days);
  hoursField.textContent = addLeadingZero(time.hours);
  minutesField.textContent = addLeadingZero(time.minutes);
  secondsField.textContent = addLeadingZero(time.seconds);
};

const startCountdown = () => {
  const endDate = flatpickr.parseDate(timerInput.value);
  interval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentDate = new Date();
    const timeLeft = endDate - currentDate;

    if (timeLeft <= 0) {
      clearInterval(interval);
      updateInterface(convertMs(0));
      Notiflix.Notify.success('Countdown finished!');
      startButton.disabled = true;
    } else {
      updateInterface(convertMs(timeLeft));
    }
  }
};

flatpickr(timerInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', startCountdown);
