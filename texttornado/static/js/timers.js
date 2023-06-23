// Set the total number of seconds (3 days)
var totalSeconds = 3 * 24 * 60 * 60;

// Update the timer every second
var timer2 = setInterval(function () {
  // Calculate the remaining days, hours, minutes and seconds
  var days = Math.floor(totalSeconds / (24 * 60 * 60));
  var hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  var minutes = Math.floor((totalSeconds / 60) % 60);
  var seconds = Math.floor(totalSeconds % 60);

  // Display the remaining time on the webpage
  document.getElementById("timer").innerHTML = days + " DAYS, " + hours + ":" + minutes + ":" + seconds;

  // Decrement the total number of seconds
  totalSeconds--;

  // Stop the timer when it reaches zero
  if (totalSeconds < 0) {
    clearInterval(timer2);
    document.getElementById("timer").innerHTML = "Time's up!";
  }
}, 1000);



// Set the total number of seconds (3 days)
var totalSeconds1 = 4 * 24 * 60 * 60;

// Update the timer every second
var timer1 = setInterval(function () {
  // Calculate the remaining days, hours, minutes and seconds
  var days1 = Math.floor(totalSeconds1 / (24 * 60 * 60));
  var hours1 = Math.floor((totalSeconds1 / (60 * 60)) % 24);
  var minutes1 = Math.floor((totalSeconds1 / 60) % 60);
  var seconds1 = Math.floor(totalSeconds1 % 60);

  // Display the remaining time on the webpage
  document.getElementById("timer1").innerHTML = days1 + " DAYS, " + hours1 + ":" + minutes1 + ":" + seconds1;

  // Decrement the total number of seconds
  totalSeconds1--;

  // Stop the timer when it reaches zero
  if (totalSeconds1 < 0) {
    clearInterval(timer1);
    document.getElementById("timer1").innerHTML = "Time's up!";
  }
}, 1000);
