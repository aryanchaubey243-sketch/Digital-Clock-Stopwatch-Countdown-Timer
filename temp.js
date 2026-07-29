const digitalClock = document.querySelector('#Btn1');
const stopWatch = document.querySelector('#Btn2');
const timer = document.querySelector('#Btn3');
const clock = document.querySelector('#Digital-Clock-section');
const stopwatch = document.querySelector('#Stopwatch-section');
const stopTimer = document.querySelector('#Timer-section');
const section = document.querySelectorAll('section');
const hours = document.querySelector('#inp1');
const minutes = document.querySelector('#inp2');
const seconds = document.querySelector('#inp3');
const Mseconds = document.querySelector('#inp4');
const th = document.querySelector('#head1');
const tm = document.querySelector('#head2');
const ts = document.querySelector('#head3');
const tms = document.querySelector('#head4');
const tstart = document.querySelector('#cbtn1');
const tstop = document.querySelector('#cbtn2');
const tReset = document.querySelector('#cbtn3');
const tLap = document.querySelector('#cbtn4');
const ordered_list = document.querySelector('#list');
const timerip1 = document.querySelector('#tm-inp1');
const timerinp2 = document.querySelector('#tm-inp2');
const timerinp3 = document.querySelector('#tm-inp3');
const myList = document.querySelector('#list');
ordered_list.style.display = 'none';
function hideallsection() {
  section.forEach(vis => {
    vis.style.display = 'none';

  })
}
stopWatch.addEventListener('click', () => {
  hideallsection();
  stopwatch.style.display = 'flex';
  stopwatch.style.backgroundColor = ' #dcfce7';
  console.log('stopWatch Clicked');
});
digitalClock.addEventListener('click', () => {
  hideallsection();
  clock.style.display = 'flex';
  clock.style.backgroundColor = ' #cfe9fc';
  console.log('clock Clicked');
});
timer.addEventListener('click', () => {
  hideallsection();
  stopTimer.style.display = 'flex';
  stopTimer.style.backgroundColor = ' #fef3c7';
  console.log('Timer Clicked');
});
function checkDigit(dig) {
  return dig.length < 2;
}
const timers = setInterval(() => {
  let time = new Date();
  let hour = String(time.getHours());
  let minute = String(time.getMinutes());
  let second = String(time.getSeconds());
  let mMilliseconds = String(time.getMilliseconds());
  if (checkDigit(hour)) {
    hour = hour.padStart(2, '0');
  }
  if (checkDigit(minute)) {
    minute = minute.padStart(2, '0');
  }
  if (checkDigit(second)) {
    second = second.padStart(2, '0');
  }
  if (checkDigit(mMilliseconds)) {
    mMilliseconds = mMilliseconds.padStart(2, '0');
  }
  hours.value = hour;
  minutes.value = minute;
  seconds.value = second;
  Mseconds.value = mMilliseconds;
}, 100);
let timerSecond = 0;
let timerMinute = 0;
let timerHour = 0;
let timerM = 0;
let timersetting = null;
tstart.addEventListener('click', () => {
  tstart.style.display = 'none';
  timersetting = setInterval(() => {
    timerM += 100;
    if (timerM >= 1000) {
      timerSecond++;
      timerM = 0;
    }
    if (timerSecond >= 60) {
      timerSecond = 0;
      timerMinute++;
    }
    if (timerMinute >= 60) {
      timerHour++;
      timerMinute = 0;
    }
    th.innerText = String(timerHour).padStart(2, '0');
    tm.innerText = String(timerMinute).padStart(2, '0');
    ts.innerText = String(timerSecond).padStart(2, '0');
    tms.innerText = String(timerM).padStart(2, '0');
  }, 100);
});

tstop.addEventListener('click', () => {
  if (timersetting != null) {

    if (tstop.innerText === 'Stop') {
      tLap.style.display = 'none';
      clearInterval(timersetting);

      tstop.innerText = 'Resume';
      tstop.style.backgroundColor = 'Blue';
      th.innerText = String(timerHour).padStart(2, '0');
      tm.innerText = String(timerMinute).padStart(2, '0');
      ts.innerText = String(timerSecond).padStart(2, '0');
      tms.innerText = String(timerM).padStart(2, '0');
    }
    else {
      tLap.style.display = '';
      tstop.innerText = 'Stop';
      tstart.click();
      tstop.style.backgroundColor = '';
    }
  }
});
tReset.addEventListener('click', () => {
  tstart.style.display = '';
  timerSecond = 0;
  timerMinute = 0;
  timerHour = 0;
  timerM = 0;
  th.innerText = String(timerHour).padStart(2, '0');
  tm.innerText = String(timerMinute).padStart(2, '0');
  ts.innerText = String(timerSecond).padStart(2, '0');
  tms.innerText = String(timerM).padStart(2, '0');
  clearInterval(timersetting);
  document.querySelector('#list').innerHTML = '';
  ordered_list.style.display = 'none';
  if (tstop.innerText === 'Resume') {
    tLap.style.display = '';
    tstop.innerText = 'Stop';
    tstop.style.backgroundColor = '';
  }
});
// Target your list container globally so all functions can see it
const targetList = document.querySelector('#list');

function createLaps(hdisplay, Mdisplay, Sdisplay, MSdisplay, laps) {
  // 1. Create the list item container
  const ollis = document.createElement('li');
  ollis.classList.add('ol-lis');
  const lipar = document.createElement('div');
  lipar.classList.add('list-Par');

  // 2. Build and append the time displays
  const displays = [hdisplay, Mdisplay, Sdisplay, MSdisplay];
  for (let i = 0; i < 4; i++) {
    const p = document.createElement("p");
    p.className = "paraas";
    p.textContent = displays[i];
    lipar.appendChild(p);
    if (i < 3) {
      const colon = document.createElement("span");
      colon.className = "timer-colon";
      colon.textContent = ":";
      lipar.appendChild(colon);
    }
  }
  ollis.appendChild(lipar);

  // 3. Create the delete button and append it to the list item
  const libut = document.createElement('button');
  libut.type = 'button';
  libut.className = 'btnx';
  libut.innerText = 'X';

  libut.addEventListener('click', () => {
    ollis.remove();

    // FIXED: Remove the wrapper row if it becomes empty after deleting 'ollis'
    if (laps.children.length === 0) {
      laps.remove();
    }

    // FIXED: Check if the main list is completely empty after deletion
    if (targetList.children.length === 0) {
      targetList.style.display = 'none';
    }
  });

  ollis.appendChild(libut);
  // 4. Append the fully built list item to the lapRow wrapper
  laps.appendChild(ollis);
}

tLap.addEventListener('click', () => {
  // FIXED: Show the main list when an item is being added
  targetList.style.display = '';

  // (Assuming ordered_list is either your wrapper or the same as targetList)
  ordered_list.style.display = '';
  ordered_list.style.backgroundColor = 'rgba(99, 186, 210, 0.507)';

  // Format variables to always have leading zeros if they are single digits
  let hdisplay = String(timerHour).padStart(2, '0'),
    Mdisplay = String(timerMinute).padStart(2, '0'),
    Sdisplay = String(timerSecond).padStart(2, '0'),
    MSdisplay = String(timerM).padStart(2, '0');

  // Create a row wrapper for this specific lap entry
  const lapRow = document.createElement('div');
  lapRow.classList.add('ol-divs');

  // Run function to populate the row elements
  createLaps(hdisplay, Mdisplay, Sdisplay, MSdisplay, lapRow);

  // SUCCESS: Prepend inserts the new element at the very top of the list
  targetList.prepend(lapRow);
});

// FIXED: Initial load check to hide the list if it starts empty
if (targetList.children.length === 0) {
  targetList.style.display = 'none';
} else {
  targetList.style.display = '';
}
const timerbtnStart = document.querySelector('#tm-btn-start');
const timerbtnStop = document.querySelector('#tm-btn-stop');
const timerbtnReset = document.querySelector('#tm-btn-reset');

let timerSecond3 = 0;
let timerMinute2 = 0;
let timerHour1 = 0;
let timersettings = null;

// FIXED: Ensured inputs are read correctly
timerip1.addEventListener('input', () => {
  const stringval = timerip1.value;
  timerHour1 = Number(stringval);
});
timerinp2.addEventListener('input', () => {
  const stringval = timerinp2.value;
  timerMinute2 = Number(stringval);
});
timerinp3.addEventListener('input', () => {
  const stringval = timerinp3.value;
  timerSecond3 = Number(stringval);
});

timerbtnStart.addEventListener('click', () => {
  timerbtnStart.style.display = 'none';
  clearInterval(timersettings);

  timersettings = setInterval(() => {
    timerSecond3--;

    if (timerSecond3 < 0) {
      timerSecond3 = 59;
      timerMinute2--;
    }
    if (timerMinute2 < 0) {
      timerMinute2 = 59;
      timerHour1--;
    }

    if (timerHour1 <= 0 && timerMinute2 <= 0 && timerSecond3 <= 0) {
      timerHour1 = 0;
      timerMinute2 = 0;
      timerSecond3 = 0;
      clearInterval(timersettings);
      timersettings = null; // FIXED: Set to null when finished
      timerbtnStart.style.display = '';
    }

    timerip1.value = String(timerHour1).padStart(2, '0');
    timerinp2.value = String(timerMinute2).padStart(2, '0');
    timerinp3.value = String(timerSecond3).padStart(2, '0');
  }, 1000);
});

timerbtnReset.addEventListener('click', () => {
  timerbtnStart.style.display = '';
  timerHour1 = 0;
  timerMinute2 = 0;
  timerSecond3 = 0;
  timerip1.value = String(timerHour1).padStart(2, '0');
  timerinp2.value = String(timerMinute2).padStart(2, '0');
  timerinp3.value = String(timerSecond3).padStart(2, '0');
  
  clearInterval(timersettings);
  timersettings = null; // FIXED: Reset variable state

  if (timerbtnStop.innerText === 'Resume') {
    timerbtnStop.innerText = 'Stop';
    timerbtnStop.style.backgroundColor = '';
  }
});

timerbtnStop.addEventListener('click', () => {
  // FIXED: Check if the timer is actively running by verifying timersettings is not null
  if (timersettings !== null) {
    if (timerbtnStop.innerText === 'Stop') {
      clearInterval(timersettings);
      timersettings = null; // FIXED: Expressly set to null to indicate it is stopped
      timerbtnStop.innerText = 'Resume';
      timerbtnStop.style.backgroundColor = 'Blue';
      
      timerip1.value = String(timerHour1).padStart(2, '0');
      timerinp2.value = String(timerMinute2).padStart(2, '0');
      timerinp3.value = String(timerSecond3).padStart(2, '0');
    }
  } 
  // FIXED: If it is already stopped and button says Resume, restart it
  else if (timerbtnStop.innerText === 'Resume') {
    timerbtnStop.innerText = 'Stop';
    timerbtnStop.style.backgroundColor = '';
    timerbtnStart.click(); // Fires the start handler to set up the interval again
  }
});
