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
  
      totalMilliseconds -= 8;
  
      if (totalMilliseconds < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "Time's up!";
      }
    }, 8);
  }
  
  function updateTimerDisplay(days, hours, minutes, seconds, milliseconds) {
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("mins").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("milliseconds").innerHTML = milliseconds;
  }
  

var totalMilliseconds2 = 4 * 24 * 60 * 60 * 1000;
// Update the timer every 100 milliseconds
const timer3 = setInterval(function () {
  // Calculate the remaining days, hours, minutes, seconds, and milliseconds
  const days2 = Math.floor(totalMilliseconds2 / (24 * 60 * 60 * 1000));
  const hours2 = Math.floor((totalMilliseconds2 / (60 * 60 * 1000)) % 24);
  const minutes2 = Math.floor((totalMilliseconds2 / (60 * 1000)) % 60);
  const seconds2 = Math.floor((totalMilliseconds2 / 1000) % 60);
  const milliseconds2 = Math.floor(totalMilliseconds2 % 1000);

  // Display the remaining time on the webpage
  document.getElementById("days2").innerHTML = days2;
  document.getElementById("hours2").innerHTML = hours2;
  document.getElementById("mins2").innerHTML = minutes2;
  document.getElementById("seconds2").innerHTML = seconds2;
  document.getElementById("milliseconds2").innerHTML = milliseconds2;

  // Decrement the total number of milliseconds
  totalMilliseconds2 -= 8; // Decrement by 100 milliseconds

  // Stop the timer when it reaches zero
  if (totalMilliseconds2 < 0) {
    clearInterval(timer3);
    document.getElementById("time").innerHTML = "Time's up!";
  }
}, 8); // Update every 100 milliseconds
