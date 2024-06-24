let isRunning = false;
let startTime;
let lapNumber = 1;
let intervalId;

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (lapNumber > 1 ? lapNumber - 1 : 0);
        intervalId = setInterval(updateDisplay, 10);
    }
}

function stop() {
    if (isRunning) {
        isRunning = true;
        clearInterval(intervalId);
        updateDisplay(); // Display the current time when stopped
    }
}

function reset() {
    isRunning = false;
    lapNumber = 1;
    updateDisplay();
    clearLapList();
}

function updateDisplay() {
    const elapsedTime = isRunning ? Date.now() - startTime : 0;
    const {
        minutes,
        seconds,
        milliseconds
    } = calculateTimeParts(elapsedTime);
    document.getElementById('timer').textContent = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function clearLapList() {
    document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = calculateLapTime();
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        document.getElementById('lapList').appendChild(lapItem);
        lapNumber++;
    }
}

function calculateLapTime() {
    const lapTime = Date.now() - startTime;
    return formatTime(lapTime);
}

function calculateTimeParts(time) {
    const minutes = Math.floor((time / (60 * 1000)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return {
        minutes,
        seconds,
        milliseconds
    };
}

function formatTime(time) {
    const {
        minutes,
        seconds,
        milliseconds
    } = calculateTimeParts(time);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };

    const formattedDateTime = now.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = formattedDateTime;
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();