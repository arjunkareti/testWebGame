// script.js
const startButton = document.getElementById('startButton');
const timerOverlay = document.getElementById('timerOverlay');
const tapCountElement = document.getElementById('tapCount');
const tapButton = document.getElementById('tapButton');
const resultPopup = document.getElementById('resultPopup');
const popupText = document.getElementById('popupText');
const playAgainButton = document.getElementById('playAgainButton');
const horizontalProgressBar = document.getElementById('horizontalProgressBar');
const backgroundMusic = document.getElementById('backgroundMusic');

let tapCount = 0;
let secondsLeft = 60;
let timerInterval;
let isEvenTap = false;
playAgainButton.style.display = 'none';
messageImage.style.display = 'none';
backgroundMusic.volume = 0.2;
let gameStarted = false;


startButton.addEventListener('click', () => {
console.log("i have started the game")
    startGame();
    startButton.style.display = 'none'; // Hide the "Play Again" button
});


function startGame(){
    startButton.disabled = true;
    tapButton.disabled = false;
    gameStarted = true;
    updateTimerDisplay();


    timerInterval = setInterval(() => {
        secondsLeft--;
        updateTimerDisplay();
        if (secondsLeft === 0) {
            checkResult();
            console.log(tapButton.disabled)
            console.log("i have checked result in start game function")
            startButton.style.display = 'block';
            console.log("this is the seconds is 0 under the startGame function")
            console.log(tapButton.disabled)
            clearInterval(timerInterval);
        }
    }, 1000);
}
function updateTimerDisplay() {
    timerOverlay.textContent = `${secondsLeft}`;
}
/*document.getElementById('tapButton').addEventListener('click', () => {
       if (gameStarted && secondsLeft > 0 && !tapButton.disabled) {
           tapCount++;
           tapCountElement.textContent = `Taps: ${tapCount}`;
           updateHorizontalProgressBar();
           playTapSound();

            if (tapCount % 2 === 0) {
                       tapButton.src = 'closechest.png'; // Change to the second image
                   } else {
                       tapButton.src = 'openchest2.png'; // Change to the first image
                   }

            *//* if (tapCount >= 15 && tapCount < 25) {
                   showMilestoneNotification('Congratulations! You have hit the 1st milestone! Continue to strive harder');
                       //displayResultPopup(true); // Show milestone notification message
                       console.log("i have displayed the milestone message")
                   }*//*
       } else {
            checkResult();
            console.log("this is the seconds is 0 else condition under the tap function")
       }
   });*/

   tapButton.addEventListener('click', () => {
       if (!gameStarted) {
           return; // Do nothing if the game hasn't started
       }
       if (secondsLeft > 0) {
           tapCount++;
           tapCountElement.textContent = `Taps: ${tapCount}`;
           updateHorizontalProgressBar();
           playTapSound();

           if (tapCount % 2 === 0) {
               tapButton.src = 'closechest.png'; // Change to the second image
           } else {
               tapButton.src = 'openchest2.png'; // Change to the first image
           }
       } else {
           checkResult();
           console.log("this is the seconds is 0 else condition under the tap function")
       }
   });


playAgainButton.addEventListener('click', () => {
    resultPopup.style.display = 'block';
    console.log("you have clicked play again")
    resetGame();
    console.log("play again func has called reset game")
    gameStarted = false;
});

/*function showMilestoneNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("milestone-notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
        if (tapCount === 25) {
              //displayResultPopup(true); // Show the final results popup for reaching 25 taps
                }
    }, 3000); // Hide the notification after 3 seconds (adjust as needed)
}*/
function updateHorizontalProgressBar() {
    const maxProgressWidth = horizontalProgressBar.parentElement.clientWidth;
    const tapPercentage = (tapCount / 750) * 100;
    const progressWidth = (tapPercentage / 100) * maxProgressWidth;
    horizontalProgressBar.style.width = `${progressWidth}px`;
}

function playTapSound() {
    const tapSound = document.getElementById('tapSound');
    tapSound.currentTime = 0;
    tapSound.play();
}

function checkResult() {
    tapButton.disabled = true;
    console.log("i have disabled tap button in checkResult function")
    console.log(tapButton.disabled)
    resultPopup.style.display = 'block';
    console.log("i have displayed the results")
    console.log(tapCount)

    if (tapCount >= 600) {
        popupText.textContent = 'Congratulations! You won S$5K credits!';
    } else if (tapCount >= 430 && tapCount < 599) {
        console.log("i have entered the display if else condition")
        popupText.textContent = 'Congratulations! You won S$2K credits!';
    }else if (tapCount >= 280 && tapCount < 430) {
        console.log("i have entered the display if else condition")
        popupText.textContent = 'Congratulations! You won 60% off!';
        }
    else if (tapCount >= 130 && tapCount < 280) {
        console.log("i have entered the display if else condition")
        popupText.textContent = 'Congratulations! You won 45% off!';
        }
    else {
        popupText.textContent = 'Sorry, you did not win! Try again.';
    }



playAgainButton.style.display = 'flex';
    //Enable the "play again" button
    playAgainButton.disabled = false;
    messageImage.style.display = 'flex';
}



function resetGame() {
    tapButton.disabled = true;
    startButton.disabled = false;
    tapCount = 0;
    secondsLeft = 60;
    timerOverlay.textContent = `${secondsLeft}`;
    tapCountElement.textContent = 'Taps: 0';
    horizontalProgressBar.style.width = '0';
    clearInterval(timerInterval);
    tapButton.src = 'closechest.png';
    resultPopup.style.display = 'none';
    playAgainButton.style.display = 'none';
    messageImage.style.display = 'none';
}
