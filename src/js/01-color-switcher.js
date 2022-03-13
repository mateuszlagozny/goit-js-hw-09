function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const body = document.querySelector('body');
  
  let backgroundInterval = null;

startBtn.addEventListener('click', onColorSwitchStart);
stopBtn.addEventListener('click', onColorSwitchStop);
  
function backgroundSwich () {
    return body.style.background = getRandomHexColor();
};

function onColorSwitchStart() {
    backgroundInterval = setInterval(backgroundSwich, 1000);
    stop.disabled = false;
    startBtn.disabled = true;
};

function onColorSwitchStop() {
    clearInterval(backgroundInterval);
    stop.disabled = true;
    startBtn.disabled = false;
}