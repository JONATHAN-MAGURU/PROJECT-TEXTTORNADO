async function processEndEvents() {
  try {
    const response = await fetch("/getEndEvents");
    if (response.status === 200) {
      const data = await response.json();
      if (Array.isArray(data.end_events)) {
        const endEvents = data.end_events;
        let totalMilliseconds = 0;
        for (const event of endEvents) {
          const endEvent = parseInt(event.endEvent, 10);
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
}

document.addEventListener("DOMContentLoaded", async () => {
  processEndEvents();
});

// Now you can also call processEndEvents() from other places in your code:
// For example, you can call it in response to user actions or other events.

function startCountdown(totalMilliseconds) {
  const timer = setInterval(() => {
    const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    updateTimerDisplay(days, hours, minutes, seconds, milliseconds);

    totalMilliseconds -= 8;

    if (totalMilliseconds < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Time's up!";
    }
  }, 5);
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
          const nextEvent = parseInt(event.nextEvent, 10); // Convert to integer
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
  const timer3 = setInterval(function () {
    // Calculate the remaining days, hours, minutes, seconds, and milliseconds
    const days2 = Math.floor(totalMilliseconds2 / (24 * 60 * 60 * 1000));
    const hours2 = Math.floor((totalMilliseconds2 / (60 * 60 * 1000)) % 24);
    const minutes2 = Math.floor((totalMilliseconds2 / (60 * 1000)) % 60);
    const seconds2 = Math.floor((totalMilliseconds2 / 1000) % 60);
    const milliseconds2 = Math.floor(totalMilliseconds2 % 1000);

    updateTimerDisplay2(days2, hours2, minutes2, seconds2, milliseconds2);

    totalMilliseconds2 -= 8;

    if (totalMilliseconds2 < 0) {
      clearInterval(timer3);
      document.getElementById("timer").innerHTML = "Time's up!";
    }
  }, 5);
}

function updateTimerDisplay2(days2, hours2, minutes2, seconds2, milliseconds2) {
  document.getElementById("days2").innerHTML = days2;
  document.getElementById("hours2").innerHTML = hours2;
  document.getElementById("mins2").innerHTML = minutes2;
  document.getElementById("seconds2").innerHTML = seconds2;
  document.getElementById("milliseconds2").innerHTML = milliseconds2;
}
