const endEventHolder = document.getElementsByClassName("welcomeUserHolder")[1];
const macrot1 = document.querySelector('#k1')
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/get_remaining_time");
    if (response.status === 200) {
      const data = await response.json();
      const rtime = parseInt(data.remaining_time, 10);
      startCountdown(rtime);
    } else {
      console.log("Request failed. Returned status of " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function startCountdown(secondss) {
  const startTime = Date.now();
  const timer = setInterval(() => {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - startTime;
    const remainingMilliseconds = secondss * 1000 - elapsedMilliseconds;
    if (remainingMilliseconds <= 0) {
      clearInterval(timer);
      updateTimerDisplay("00", "00", "00", "00");
      document.querySelector("#eventHasEnded").innerHTML = "EVENT HAS ENDED";
      document.querySelector("#eventHasEnded").style.color = "gray";
      document.getElementsByClassName("callResults")[1].innerHTML="LAST EVENT PRIZES"
      document.querySelector('#vr').innerHTML="Last Event rewards"
    } else {
      const days = Math.floor(remainingMilliseconds / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remainingMilliseconds / (60 * 60 * 1000)) % 24);
      const minutes = Math.floor((remainingMilliseconds / (60 * 1000)) % 60);
      const seconds = Math.floor((remainingMilliseconds / 1000) % 60);
      updateTimerDisplay(days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/get_stating_time");
    if (response.status === 200) {
      const data = await response.json();
      const stime = parseInt(data.starting_time, 10);
      startCountdown2(stime);
    } else {
      console.log("Request failed. Returned status of " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function startCountdown2(secondss2) {
  const startTime = Date.now();
  const timer = setInterval(() => {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - startTime;
    const remainingMilliseconds = secondss2 * 1000 - elapsedMilliseconds;
    if (remainingMilliseconds <= 0) {
      clearInterval(timer);
      updateTimerDisplay2("00", "00", "00", "00");
    } else {
      const days = Math.floor(remainingMilliseconds / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remainingMilliseconds / (60 * 60 * 1000)) % 24);
      const minutes = Math.floor((remainingMilliseconds / (60 * 1000)) % 60);
      const seconds = Math.floor((remainingMilliseconds / 1000) % 60);
      updateTimerDisplay2(days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateTimerDisplay2(days2, hours2, minutes2, seconds2) {
  document.getElementById("days2").innerHTML = days2;
  document.getElementById("hours2").innerHTML = hours2;
  document.getElementById("mins2").innerHTML = minutes2;
  document.getElementById("seconds2").innerHTML = seconds2;
}

const fullscreenButton = document.getElementById("fullscreenButton");
const fullscreenButton2 = document.getElementById("fullscreenButton2");

function toggleFullscreen() {
  const element = document.documentElement;
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else {
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

fullscreenButton2.addEventListener("click", () => {
  toggleFullscreen();
});

const checking = document.querySelector("#checking");
const messages = [
  "establishing secure connection...",
  "event has ended...",
  "verifying timers data...",
  "Synchronizing timers with server time...",
  "Processing leaderboard scores...",
  "processed successfully...",
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
      setTimeout(typeMessage, 3100);
    } else {
      setTimeout(typeMessage, 80);
    }
  } else {
    setTimeout(callWinner, 1000);
  }
}

function callWinner() {
  showLooser();
  showWinner();
  endEventHolder.style.display = "block";
  document.querySelector(".spinner").style.display = "none";
  checking.style.display = "none";
}
function callWinnerOff() {
  endEventHolder.style.display = "none";
}

async function fetchAndCheckEndEvents() {
  try {
    const response = await fetch(`/getEndEvents?id=${id}`);

    if (response.status === 200) {
      const data = await response.json();
      const seenStatus = data.response_data.seen_status;
      const rtime = parseInt(data.response_data.remaining_time, 10);
      if (rtime < 10 && seenStatus !== "seen") {
        document.querySelector(".spinnerContainer").style.display = "block";
        setTimeout(typeMessage, 6000);
        clearInterval(clearFetch);
      }
    } else {
      console.log("Request failed. Returned status of " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


const clearFetch = setInterval(fetchAndCheckEndEvents, 5000);

const setseen = document.querySelector(".setseen");
const callResults = document.querySelector(".callResults");

callResults.addEventListener("click", function () {
  document.querySelector(".spinnerContainer").style.display = "block";
  setTimeout(callWinner, 1000);
  document.querySelector("#toAnEnd").innerHTML = "LAST EVENT RESULTS";
});

setseen.addEventListener("click", function () {
  const firstIdOb = { id };
  const jsonData = JSON.stringify(firstIdOb);
  const XHR3 = new XMLHttpRequest();
  const csrfToken = document.querySelector("#csrf_token15").value;
  XHR3.open("POST", "/setToseen", true);
  XHR3.setRequestHeader("Content-Type", "application/json");
  XHR3.setRequestHeader("X-CSRFToken", csrfToken);
  XHR3.addEventListener("load", function () {
    if (XHR3.status === 200 && XHR3.readyState === 4) {
      callWinnerOff();
      document.querySelector(".spinnerContainer").style.display = "none";
    } else {
      console.log("Something went wrong");
    }
  });

  XHR3.send(jsonData);
});

async function fetchAndCheckEndEvents2() {
  try {
    const response = await fetch(`/getEndEvents?id=${id}`);

    if (response.status === 200) {
      const data = await response.json();
      const seenStatus = data.response_data.seen_status;
      const rtime = parseInt(data.response_data.remaining_time, 10);
      if (rtime >= 5 && rtime <= 3600) {
        callResults.style.display = "none";
      }
    } else {
      console.log("Request failed. Returned status of " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchAndCheckEndEvents2();
});


const callResults2 = document.getElementsByClassName('callResults')[1];

callResults2.addEventListener('click', ()=>{
  welcomeUserHolder3.style.display = "block";
  document.querySelector(".bodyCover2").style.width = "100%";
})