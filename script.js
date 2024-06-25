let stopwatchInterval;
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapNumber = 0;

let timerInterval;
let timerRunning = false;
let timerRemainingTime;

let realTimeInterval;

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        stopwatchInterval = setInterval(updateStopwatch, 10);
        running = true;
        document.getElementById('start').style.display = 'none';
        document.getElementById('stop').style.display = 'inline-block';
        document.getElementById('pause').style.display = 'none';
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(stopwatchInterval);
        running = false;
        savedTime += new Date().getTime() - startTime;
        document.getElementById('stop').style.display = 'none';
        document.getElementById('start').style.display = 'inline-block';
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(stopwatchInterval);
        running = false;
        savedTime += new Date().getTime() - startTime;
        document.getElementById('pause').style.display = 'none';
        document.getElementById('start').style.display = 'inline-block';
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    running = false;
    savedTime = 0;
    document.getElementById('display').innerHTML = '00:00:00.0';
    document.getElementById('start').style.display = 'inline-block';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
    document.getElementById('laps').innerHTML = '';
}

function updateStopwatch() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime + savedTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 100);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    document.getElementById('display').innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        let lapTime = document.getElementById('display').innerHTML;
        let lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${++lapNumber}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
    }
}

function startTimer() {
    let hours = parseInt(document.getElementById('timer-hours').value) || 0;
    let minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    let seconds = parseInt(document.getElementById('timer-seconds').value) || 0;

    timerRemainingTime = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

    if (timerRemainingTime > 0) {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(updateTimer, 1000);
            document.getElementById('start-timer').style.display = 'none';
            document.getElementById('pause-timer').style.display = 'inline-block';
        }
    }
}

function pauseTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('pause-timer').style.display = 'none';
        document.getElementById('resume-timer').style.display = 'inline-block';
    }
}

function resumeTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('resume-timer').style.display = 'none';
        document.getElementById('pause-timer').style.display = 'inline-block';
    }
}

function stopTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('start-timer').style.display = 'inline-block';
        document.getElementById('pause-timer').style.display = 'none';
        document.getElementById('resume-timer').style.display = 'none';
        document.getElementById('stop-timer').style.display = 'none';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerRemainingTime = 0;
    document.getElementById('timer-hours').value = '';
    document.getElementById('timer-minutes').value = '';
    document.getElementById('timer-seconds').value = '';
    document.getElementById('start-timer').style.display = 'inline-block';
    document.getElementById('pause-timer').style.display = 'none';
    document.getElementById('resume-timer').style.display = 'none';
    document.getElementById('stop-timer').style.display = 'none';
}

function updateTimer() {
    if (timerRemainingTime <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        alert('Time is up!');
        document.getElementById('start-timer').style.display = 'inline-block';
        document.getElementById('pause-timer').style.display = 'none';
        document.getElementById('resume-timer').style.display = 'none';
        document.getElementById('stop-timer').style.display = 'none';
        return;
    }

    timerRemainingTime -= 1000;

    let hours = Math.floor((timerRemainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timerRemainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timerRemainingTime % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    document.getElementById('display').innerHTML = `${hours}:${minutes}:${seconds}`;
}

function updateRealTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('real-time').innerHTML = currentTime;
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('stop').addEventListener('click', stopStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('resume-timer').addEventListener('click', resumeTimer);
document.getElementById('stop-timer').addEventListener('click', stopTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);

window.onload = function () {
    realTimeInterval = setInterval(updateRealTime, 1000);
};
