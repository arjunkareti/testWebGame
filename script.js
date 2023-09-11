// script.js
const startButton = document.getElementById('startButton');
const playerNameInput = document.getElementById('playerName');
const timerElement = document.getElementById('timer');
const tapCountElement = document.getElementById('tapCount');
const tapButton = document.getElementById('tapButton');
const resultPopup = document.getElementById('resultPopup');
const popupText = document.getElementById('popupText');
const playAgainButton = document.getElementById('playAgainButton');
const verticalProgressBar = document.getElementById('verticalProgressBar');

let tapCount = 0;
let secondsLeft = 10;
let timerInterval;

startButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;
    if (playerName === '') {
        alert('Please enter your name to start.');
        return;
    }

    startButton.disabled = true;
    playerNameInput.disabled = true;
    tapButton.disabled = false;

    timerInterval = setInterval(() => {
        secondsLeft--;
        timerElement.textContent = `Time left: ${secondsLeft} seconds`;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            checkResult();
        }
    }, 1000);
});

tapButton.addEventListener('click', () => {
    if (secondsLeft > 0) {
        tapCount++;
        tapCountElement.textContent = `Taps: ${tapCount}`;
        updateVerticalProgressBar();
        playTapSound();

         if (tapCount < 15) {
                    displayResultPopup(false); // Show "You have failed" message
                } else if (tapCount >= 15 && tapCount < 25) {
                showMilestoneNotification('Congratulations! You have hit the 1st milestone! Continue to strive harder');
                    displayResultPopup(true); // Show milestone notification message
                } else if (tapCount >= 25) {
                    displayResultPopup(true); // Show "Congratulations! You won" message
                }
    }
});

playAgainButton.addEventListener('click', () => {
    resultPopup.style.display = 'none';
    resetGame();
});
function showMilestoneNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("milestone-notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
        if (tapCount === 25) {
                    displayResultPopup(true); // Show the final results popup for reaching 25 taps
                }
    }, 3000); // Hide the notification after 3 seconds (adjust as needed)
}
function updateVerticalProgressBar() {
    const maxProgressHeight = verticalProgressBar.parentElement.clientHeight;
    const tapPercentage = (tapCount / 25) * 100;
    const progressHeight = (tapPercentage / 100) * maxProgressHeight;
    verticalProgressBar.style.height = `${progressHeight}px`;
}

function playTapSound() {
    const tapSound = document.getElementById('tapSound');
    tapSound.currentTime = 0;
    tapSound.play();
}

function checkResult() {
    tapButton.disabled = true;
    resultPopup.style.display = 'flex';

    if (tapCount >= 25) {
        popupText.textContent = 'Congratulations! You won 20% off vouchers!';
        resultPopupContainer.style.backgroundColor = 'green';
    } else if (tapCount >= 15 && tapCount < 25){
     popupText.textContent = 'Congratulations! You won 10% off vouchers!';
            resultPopupContainer.style.backgroundColor = 'green';
    } 
    
    else {
        popupText.textContent = 'Sorry, you did not win! Try again.';
        resultPopupContainer.style.backgroundColor = 'red';
    }
}

function resetGame() {
    tapButton.disabled = true;
    startButton.disabled = false;
    playerNameInput.disabled = false;
    tapCount = 0;
    secondsLeft = 10;
    timerElement.textContent = `Time left: ${secondsLeft} seconds`;
    tapCountElement.textContent = 'Taps: 0';
    verticalProgressBar.style.height = '0';
    clearInterval(timerInterval);
}
