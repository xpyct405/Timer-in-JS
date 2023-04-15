var timeBegan = null; // Секундомер начал отсчёт?
var timeStopped = null; // Когда секундомер остановился?
var stoppedDuration = 0; // Как долго секундомер был остановлен
var startInterval = null; // Нужен чтобы остановить метод startInterval()d
var flag = false; // Для контроля секундомер запущен или нет
let timer = document.querySelector('#timer');

// Для запуска и остановки секундомера
window.addEventListener('click', () => {
    if (!flag) {
        startTimer();
        flag = true;
        console.log('start');
       
    } else {
        stopTimer();
        flag = false;
        console.log('stop');
    }
})

// Для запуска и остановки секундомера через кнопку пробел Space
window.addEventListener("keydown", (event) => {
    if (event.code == 'Space') {
        if (!flag) {
            startTimer();
            flag = true;
            console.log('start');
           
        } else {
            stopTimer();
            flag = false;
            console.log('stop');
        }
    }
})

// Для сброса секундомера по dblclick
window.addEventListener('dblclick', () => {
    resetTimer();
    console.log('reset');
})


// Функции начала секундомера, либо фиксации времени нажатия на старт timeBegan и времени в простое stoppedDuration
startTimer = () => {
  if (timeBegan === null)
    timeBegan = new Date();
  if (timeStopped !== null)
    stoppedDuration += (new Date() - timeStopped);
  startInterval = setInterval(clockRunning, 10);
}
clockRunning = () => {
}


// Функции остановки секундомера, либо фиксации времени нажатия на стоп timeStopped
stopTimer = () => {
  timeStopped = new Date();
  clearInterval(startInterval);
}

// Функция фиксации текущего времени currentTime, высчисления timeElapsed (это и есть секундомер)
clockRunning = () => {
  let currentTime = new Date();
  let timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

//   вытаскиваем данные timeElapsed
  let minutes = timeElapsed.getUTCMinutes();
  let seconds = timeElapsed.getUTCSeconds();
  let milliseconds = timeElapsed.getUTCMilliseconds();

//   округляем до 2-х цифр
  milliseconds = Math.floor(milliseconds/10);

//  передаём данные в timer.textContent
  timer.textContent = 
  (minutes = minutes < 10 ? '0' + minutes:minutes) + ":"+
  (seconds = seconds < 10 ? '0' + seconds:seconds) + ":" +
  (milliseconds = milliseconds < 10 ? '0' + milliseconds:milliseconds);
}

// Полный сброс секундомера до дефолтных значений
resetTimer = () => {
  clearInterval(startInterval);
  timeBegan = null;
  timeStopped = null;
  stoppedDuration = 0;
  timer.innerHTML = "00:00:00";
  flag = false;
}
