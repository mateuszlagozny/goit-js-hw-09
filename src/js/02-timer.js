
  import flatpickr from "flatpickr";

  import 'flatpickr/dist/flatpickr.min.css';
  
  const btnStart = document.querySelector('button[data-start]');
  const days = document.querySelector('span[data-days]');
  const hours = document.querySelector('span[data-hours]');
  const minutes = document.querySelector('span[data-minutes]');
  const seconds = document.querySelector('span[data-seconds]');
  
  btnStart.disabled = true;
  
  let selectedDate = null;
  let currentDate = null;
  let remainingTime = null;
  let currentValue = '';
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const date = new Date();
      if (selectedDates[0].getTime() <= date.getTime()) {
          alert("Please choose a date in the future")
      } else {
        btnStart.disabled = false;
        selectedDate = selectedDates[0];
        currentDate = date;
      }
    },
  };

  
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
  
  
  const addLeadingZero = value => {
    return (currentValue = value.toString().padStart(2, 0));
  };   
  
  function timeCounter() {
    let time = selectedDate.getTime() - currentDate.getTime();
    remainingTime = setInterval(() => {
      time -= 1000;
      if (time <= 200) {
        clearInterval(remainingTime);
      } else {
        let remaining = convertMs(time);
        days.innerHTML = addLeadingZero(remaining.days);
        hours.innerHTML = addLeadingZero(remaining.hours);
        minutes.innerHTML = addLeadingZero(remaining.minutes);
        seconds.innerHTML = addLeadingZero(remaining.seconds);
        btnStart.disabled = true;
      }
    }, 1000);
  }
  
  flatpickr("#datetime-picker", options);
  
  btnStart.addEventListener('click', timeCounter)