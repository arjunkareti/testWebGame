// script.js
const startButton = document.getElementById ('startButton');
const timerOverlay = document.getElementById ('timerOverlay');
const tapCountElement = document.getElementById ('tapCount');
const tapButton = document.getElementById ('tapButton');
const resultPopup = document.getElementById ('resultPopup');
const popupText = document.getElementById ('popupText');
const playAgainButton = document.getElementById ('playAgainButton');
const horizontalProgressBar = document.getElementById ('horizontalProgressBar');
const toggleCheckbox = document.getElementById ('toggle1');
const backgroundMusic = document.getElementById ('backgroundMusic');

let tapCount = 0;
let secondsLeft = 30;
let timerInterval;
let isEvenTap = false;
playAgainButton.style.display = 'none';
messageImage.style.display = 'none';
backgroundMusic.volume = 0.2;
let gameStarted = false;

// Initialize audio elements
const audioElements = [];

// Preload audio files
function preloadAudio() {
  for (let i = 1; i <= 5; i++) {
    const audio = new Audio(`jump${i}.wav`);
    audioElements.push(audio);
  }
}

// Play tap sound
function playTapSound() {
  if (audioElements.length > 0) {
    const audio = audioElements.pop(); // Get an available audio element
    audio.currentTime = 0;
    audio.play();

    // Add the audio element back to the pool after it finishes playing (optional)
    audio.addEventListener('ended', () => {
      audioElements.push(audio);
    });
  }
}

toggleCheckbox.addEventListener ('change', () => {
  if (toggleCheckbox.checked) {
    backgroundMusic.play ();
  } else {
    backgroundMusic.pause ();
  }
});

startButton.addEventListener ('click', () => {
  console.log ('i have started the game');
  startGame ();
  startButton.style.display = 'none'; // Hide the "Play Again" button
});

function startGame () {
  startButton.disabled = true;
  tapButton.disabled = false;
  gameStarted = true;
  updateTimerDisplay ();

  timerInterval = setInterval (() => {
    secondsLeft--;
    updateTimerDisplay ();
    if (secondsLeft === 0) {
      checkResult ();
      startButton.style.display = 'none';
      clearInterval (timerInterval);
    }
  }, 1000);
}
function updateTimerDisplay () {
  timerOverlay.textContent = `${secondsLeft}`;
}

function handleTapButtonClick () {
  if (!gameStarted) {
    return; // Do nothing if the game hasn't started
  }

  if (secondsLeft > 0) {
    incrementTapCount ();
    updateHorizontalProgressBar ();
    playTapSound ();
    toggleChestImage ();
  } else {
    handleGameEnd ();
  }
}

function incrementTapCount () {
  tapCount++;
  tapCountElement.textContent = `Taps: ${tapCount}`;
}

function toggleChestImage () {
  if (tapCount % 2 === 0) {
    tapButton.src = 'closechest.png';
  } else {
    tapButton.src = 'openchest2.png';
  }
}

function handleGameEnd () {
  checkResult ();
}

// Attach the event listener
tapButton.addEventListener ('click', handleTapButtonClick);

playAgainButton.addEventListener ('click', () => {
  resultPopup.style.display = 'block';
  resetGame ();
  console.log ('play again func has called reset game');
  gameStarted = false;
  startButton.style.display = 'block';
});

function updateHorizontalProgressBar () {
  const maxProgressWidth = horizontalProgressBar.parentElement.clientWidth;
  const tapPercentage = tapCount / 265 * 100;
  const progressWidth = tapPercentage / 100 * maxProgressWidth;
  horizontalProgressBar.style.width = `${progressWidth}px`;
}

/*
function playTapSound () {
  const tapSound = document.getElementById ('tapSound');
  tapSound.addEventListener('canplaythrough', () => {
      // The audio has loaded and can be played without interruption.
      // You can now play the audio or perform other actions.
      console.log('Audio is ready to play');
  });
  tapSound.currentTime = 0;
  tapSound.play ();
}
*/

function checkResult () {
  tapButton.disabled = true;
  resultPopup.style.display = 'block';

  if (tapCount >= 250) {
    popupText.textContent = 'Congratulations! You won S$5K credits!';
  } else if (tapCount >= 210 && tapCount < 250) {
    popupText.textContent = 'Congratulations! You won S$2K credits!';
  } else if (tapCount >= 158 && tapCount < 210) {
    popupText.textContent = 'Congratulations! You won 60% off!';
  } else if (tapCount >= 103 && tapCount < 158) {
    popupText.textContent = 'Congratulations! You won 45% off!';
  } else {
    popupText.textContent = 'Sorry, you did not win! Try again.';
  }


  playAgainButton.style.display = 'flex';
  //Enable the "play again" button
  playAgainButton.disabled = false;
  messageImage.style.display = 'flex';
}

function resetGame () {
  tapButton.disabled = true;
  startButton.disabled = false;
  tapCount = 0;
  secondsLeft = 30;
  timerOverlay.textContent = `${secondsLeft}`;
  tapCountElement.textContent = 'Taps: 0';
  horizontalProgressBar.style.width = '0';
  clearInterval (timerInterval);
  tapButton.src = 'closechest.png';
  resultPopup.style.display = 'none';
  playAgainButton.style.display = 'none';
  messageImage.style.display = 'none';
}
// Call preloadAudio function to load audio files
preloadAudio();
