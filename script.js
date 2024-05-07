const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const currentTimeDisplay = document.querySelector(".current-time");
const totalTimeDisplay = document.querySelector(".total-time");

// Play/Pause functionality
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.remove('play');
        playPauseButton.classList.add('pause');
        playPauseButton.textContent = "Pause"; 
    } else {
        audio.pause();
        playPauseButton.classList.remove('pause');
        playPauseButton.classList.add('play');
        playPauseButton.textContent = "Play"; 
    }
});

// Update progress bar and time
audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    displayTime(currentTime, currentTimeDisplay);
    displayTime(duration, totalTimeDisplay);
}

function displayTime(time, element) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds; 
    element.textContent = `${minutes}:${seconds}`;
}
