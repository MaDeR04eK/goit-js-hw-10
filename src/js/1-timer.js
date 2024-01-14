import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const btnEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const dDays = document.querySelector('[data-days]');
const dHours = document.querySelector('[data-hours]');
const dMinutes = document.querySelector('[data-minutes]');
const dSeconds = document.querySelector('[data-seconds]');

let timeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    timeDifference = 0;
    updateTimer(timeDifference);
    clearInterval(countdownInterval);
    const flag = selectedDates <= Date.now();

    if (flag) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
    btnEl.disabled = flag;
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  dDays.textContent = addLeadingZero(days);
  dHours.textContent = addLeadingZero(hours);
  dMinutes.textContent = addLeadingZero(minutes);
  dSeconds.textContent = addLeadingZero(seconds);
}

let countdownInterval;

document.querySelector('[data-start]').addEventListener('click', () => {
  timeDifference = new Date(inputEl.value).getTime() - new Date();
  console.log(timeDifference);
  if (timeDifference <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }
  updateTimer(timeDifference);

  countdownInterval = setInterval(() => {
    updateTimer(timeDifference);

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        meassage: 'Countdown has ended!',
      });
    }

    timeDifference -= 1000;
  }, 1000);
});

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
