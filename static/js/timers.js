const endEventHolder = document.getElementsByClassName("welcomeUserHolder")[1];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/getEndEvents");
    if (response.status === 200) {
      const data = await response.json();
      if (Array.isArray(data.end_events)) {
        const endEvents = data.end_events;
        let totalMilliseconds = 0;
        for (const event of endEvents) {
          const endEvent = parseInt(event.endEvent, 10); // Convert to integer
          if (!isNaN(endEvent)) {
            totalMilliseconds += endEvent;
          }
        }

        startCountdown(totalMilliseconds);
      } else {
        console.log("Invalid server response.");
      }
    } else {
      console.log("Request failed. Returned status of " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function startCountdown(totalMilliseconds) {
  const timer = setInterval(() => {
    const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    updateTimerDisplay(days, hours, minutes, seconds, milliseconds);

    totalMilliseconds -= 9;

    if (totalMilliseconds < 0) {
      clearInterval(timer);
    }
  }, 4);
}

function updateTimerDisplay(days, hours, minutes, seconds, milliseconds) {
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  document.getElementById("milliseconds").innerHTML = milliseconds;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/getNextEvents");
    if (response.status === 200) {
      const data = await response.json();
      if (Array.isArray(data.next_events)) {
        const nextEvents = data.next_events;
        let totalMilliseconds = 0;
        for (const event of nextEvents) {
          const nextEvent = parseInt(event.nextEvent, 10);
          if (!isNaN(nextEvent)) {
            totalMilliseconds += nextEvent;
          }
        }
        startCountdown2(totalMilliseconds);
      } else {
        console.log("Invalid server response.");
      }
    } else {
      console.log("Request failed. Returned status of " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function startCountdown2(totalMilliseconds2) {
  const startTime = Date.now();

  const timer3 = setInterval(function () {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - startTime;
    const remainingMilliseconds = totalMilliseconds2 - elapsedMilliseconds;

    if (remainingMilliseconds <= 0) {
      clearInterval(timer3);
    } else {
      const days2 = Math.floor(remainingMilliseconds / (24 * 60 * 60 * 1000));
      const hours2 = Math.floor(
        (remainingMilliseconds / (60 * 60 * 1000)) % 24
      );
      const minutes2 = Math.floor((remainingMilliseconds / (60 * 1000)) % 60);
      const seconds2 = Math.floor((remainingMilliseconds / 1000) % 60);
      const milliseconds2 = Math.floor(remainingMilliseconds % 1000);

      updateTimerDisplay2(days2, hours2, minutes2, seconds2, milliseconds2);
    }
  }, 5); // Update every 1000 milliseconds (1 second)
}

function updateTimerDisplay2(days2, hours2, minutes2, seconds2, milliseconds2) {
  document.getElementById("days2").innerHTML = days2;
  document.getElementById("hours2").innerHTML = hours2;
  document.getElementById("mins2").innerHTML = minutes2;
  document.getElementById("seconds2").innerHTML = seconds2;
  document.getElementById("milliseconds2").innerHTML = milliseconds2;
}

const fullscreenButton = document.getElementById("fullscreenButton");

// Function to toggle fullscreen
function toggleFullscreen() {
  const element = document.documentElement; // Get the document element (usually the <html> element)

  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // Enter fullscreen if not already in fullscreen mode
    if (element.requestFullscreen) {
      element.requestFullscreen(); // Standard way to enter fullscreen
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Chrome, Safari, and Opera
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  } else {
    // Exit fullscreen if already in fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

fullscreenButton.addEventListener("click", () => {
  toggleFullscreen();
});

const checking = document.querySelector("#checking");
const messages = [
  "Establishing secure connection...",
  "event has ended...",
  "Checking user timer...",
  "Verifying timers data...",
  "Synchronizing timers with server time...",
  "If Timer 1 is still running, is due to a synchronization issue with your browser...",
  "Processing leaderboard scores...",
  "Verifying the winner...",
  "Displaying results...",
];

let currentMessageIndex = 0;
let currentCharacterIndex = 0;

function typeMessage() {
  if (currentMessageIndex < messages.length) {
    const currentMessage = messages[currentMessageIndex];
    const currentCharacter = currentMessage[currentCharacterIndex];

    checking.innerHTML = currentMessage.substring(0, currentCharacterIndex + 1);
    currentCharacterIndex++;

    if (currentCharacterIndex === currentMessage.length) {
      currentMessageIndex++;
      currentCharacterIndex = 0;
      setTimeout(typeMessage, 3400);
    } else {
      setTimeout(typeMessage, 80);
    }
  } else {
    setTimeout(callWinner, 1000);
  }
}

function callWinner() {
  endEventHolder.style.display = "block";
  document.querySelector(".spinner").style.display = "none";
  checking.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  async function fetchAndCheckEndEvents() {
    try {
      const response = await fetch("/getEndEvents");
      if (response.status === 200) {
        const data = await response.json();
        if (Array.isArray(data.end_events)) {
          const endEvents = data.end_events;
          for (const event of endEvents) {
            const endEvent = parseInt(event.endEvent, 10); 
            if (!isNaN(endEvent) && endEvent < 30000) {
              document.querySelector(".spinnerContainer").style.display =
                "block";
              setTimeout(typeMessage, 12000);
            }
          }
        } else {
          console.log("Invalid server response.");
        }
      } else {
        console.log("Request failed. Returned status of " + response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  fetchAndCheckEndEvents();
  setInterval(fetchAndCheckEndEvents, 12000);
});

