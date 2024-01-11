import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
const currentDate = new Date();
    if (userSelectedDate < currentDate) {
      // Вивести повідомлення та зробити кнопку неактивною
      window.alert("Please choose a date in the future");
      mainBtn.disabled = true;
    } else {
      // Зробити кнопку активною
      mainBtn.disabled = false;
    }
  },
};
flatpickr("#datetime-picker", options);

const mainBtn = document.querySelector(".btn-main")

mainBtn.addEventListener('click', () => {
  if (userSelectedDate && userSelectedDate >= new Date()) {
    console.log("Timer started!");
  } else {
    window.alert("Please choose a valid date in the future");
  }
});
