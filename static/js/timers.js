var totalMilliseconds = 3 * 24 * 60 * 60 * 1000;

// Update the timer every 100 milliseconds
const timer2 = setInterval(function () {
    // Calculate the remaining days, hours, minutes, seconds, and milliseconds
    const days = Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((totalMilliseconds / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((totalMilliseconds / (60 * 1000)) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    // Display the remaining time on the webpage
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("mins").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("milliseconds").innerHTML = milliseconds;

    // Decrement the total number of milliseconds
    totalMilliseconds -= 8; // Decrement by 100 milliseconds

    // Stop the timer when it reaches zero
    if (totalMilliseconds < 0) {
        clearInterval(timer2);
        document.getElementById("timer").innerHTML = "Time's up!";
    }
}, 8); // Update every 100 milliseconds


var totalMilliseconds2 = 4 * 24 * 60 * 60 * 1000;
// Update the timer every 100 milliseconds
const timer3 = setInterval(function () {
    // Calculate the remaining days, hours, minutes, seconds, and milliseconds
    const days2 = Math.floor(totalMilliseconds2 / (24 * 60 * 60 * 1000));
    const hours2 = Math.floor((totalMilliseconds2 / (60 * 60 * 1000)) % 24);
    const minutes2 = Math.floor((totalMilliseconds2 / (60 * 1000)) % 60);
    const seconds2 = Math.floor((totalMilliseconds / 1000) % 60);
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


