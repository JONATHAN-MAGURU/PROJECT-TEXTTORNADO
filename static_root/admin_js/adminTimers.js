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
